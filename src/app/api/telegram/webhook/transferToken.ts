import { delay, getRandomUint64 } from "@/lib/common";
import { initializeTonClient } from "@/lib/tonClient";
import { Network } from "@orbs-network/ton-access";
import { Exchange } from "@prisma/client";
import {
  JettonMaster,
  WalletContractV4,
  Address,
  internal,
  external,
  toNano,
  beginCell,
  SendMode,
  storeMessage,
  TonClient,
} from "@ton/ton";
import { mnemonicToWalletKey } from "@ton/crypto";
import { prisma } from "@/lib/prisma";

const secretPhrase = (process.env.SECRET_PHRASES as string).split(" ");
const network = process.env.NETWORK as Network;
const usdtMasterAddress = Address.parse(
  network === "mainnet"
    ? "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs"
    : "kQD0GKBM8ZbryVk2aESmzfU6b9b_8era_IkvBSELujFZPsyy"
);

async function retryInitializeTonClient(network: Network, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await initializeTonClient(network);
      return client;
    } catch (e) {
      console.error(`Attempt ${i + 1} to initialize TON client failed:`, e);
      if (i === retries - 1) throw e;
      await delay(1000);
    }
  }
}

async function retrySendFile(
  client: TonClient,
  signedTransaction: Buffer,
  retries = 5
) {
  for (let i = 0; i < retries; i++) {
    try {
      await client.sendFile(signedTransaction);
      return;
    } catch (error) {
      console.error(`Attempt ${i + 1} to send transaction failed:`, error);
      if (i === retries - 1) throw error;
      await delay(1000);
    }
  }
}

async function getBasicTools() {
  const client = await retryInitializeTonClient(network);
  if (!client) {
    throw new Error("Initializing TON client was failed");
  }
  const keyPair = await mnemonicToWalletKey(secretPhrase);
  const wallet = WalletContractV4.create({
    workchain: 0,
    publicKey: keyPair.publicKey,
  });
  const contract = client.open(wallet);
  const seqno = await contract.getSeqno();
  const jettonMaster = client.open(JettonMaster.create(usdtMasterAddress));
  const jettonWalletAddress = await jettonMaster.getWalletAddress(
    wallet.address
  );
  return { client, wallet, seqno, keyPair, jettonWalletAddress };
}

function getInternalMessageCell(
  amount: number,
  toAddress: Address,
  responseAddress: Address
) {
  const forwardPayload = beginCell()
    .storeUint(0, 32)
    .storeStringTail("Bagel Finance")
    .endCell();
  const messageCell = beginCell()
    .storeUint(0x0f8a7ea5, 32) // opcode for jetton transfer
    .storeUint(getRandomUint64(), 64) // query id
    .storeCoins(amount) // jetton amount
    .storeAddress(toAddress)
    .storeAddress(responseAddress) // response destination
    .storeBit(0) // no custom payload
    .storeCoins(0) // forward amount - if >0, will send notification message
    .storeBit(1) // we store forwardPayload as a reference
    .storeRef(forwardPayload)
    .endCell();
  return messageCell;
}

export async function transferToken(exchange: Exchange) {
  const toAddress = Address.parse(exchange.toAddress);
  const { client, wallet, seqno, keyPair, jettonWalletAddress } =
    await getBasicTools();
  let hash;
  let signedTransaction;
  if (exchange.coin === "USDT") {
    const amount = Math.round(exchange.amount * 10 ** 6);
    const internalMessage = internal({
      to: jettonWalletAddress,
      value: toNano("0.1"),
      bounce: true,
      body: getInternalMessageCell(amount, toAddress, wallet.address),
    });
    const externalMessage = external({
      to: wallet.address,
      body: wallet.createTransfer({
        seqno,
        secretKey: keyPair.secretKey,
        sendMode: SendMode.IGNORE_ERRORS + SendMode.PAY_GAS_SEPARATELY,
        messages: [internalMessage],
      }),
    });
    const externalMessageCell = beginCell()
      .store(storeMessage(externalMessage))
      .endCell();
    signedTransaction = externalMessageCell.toBoc();
    hash = externalMessageCell.hash().toString("hex");
  } else if (exchange.coin === "TON") {
    const internalMessage = internal({
      to: toAddress,
      value: exchange.amount.toString(),
      bounce: false,
      body: "Bagel Finance",
    });
    const externalMessage = external({
      to: wallet.address,
      body: wallet.createTransfer({
        seqno,
        secretKey: keyPair.secretKey,
        sendMode: SendMode.IGNORE_ERRORS + SendMode.PAY_GAS_SEPARATELY,
        messages: [internalMessage],
      }),
    });
    const externalMessageCell = beginCell()
      .store(storeMessage(externalMessage))
      .endCell();
    signedTransaction = externalMessageCell.toBoc();
    hash = externalMessageCell.hash().toString("hex");
  }
  if (!signedTransaction) {
    throw new Error("Transaction not created");
  }
  await retrySendFile(client, signedTransaction);
  const result = await prisma.exchange.update({
    where: { id: exchange.id },
    data: { status: "SENT", hash },
  });
  return result;
}
