import { useInitData } from "@telegram-apps/sdk-react";
import {
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useRef } from "react";
import { Address, SenderArguments } from "@ton/ton";
import { upsertWallet } from "./actions";

export function useTonConnect() {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const [tonConnectUI] = useTonConnectUI();
  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const walletConnectedRef = useRef(false);

  tonConnectUI.onStatusChange(async (wallet) => {
    if (userId && wallet) {
      if (walletConnectedRef.current) {
        return;
      }
      upsertWallet({
        userId: userId.toString(),
        address: wallet.account.address,
      });
      walletConnectedRef.current = true;
    }
  });

  return {
    tonConnectUI,
    isConnectionRestored,
    isConnected: !!wallet?.account.address,
    address: wallet?.account.address
      ? Address.parse(wallet?.account.address)
      : undefined,
    network: wallet?.account.chain ?? null,
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000,
        });
      },
    },
  };
}
