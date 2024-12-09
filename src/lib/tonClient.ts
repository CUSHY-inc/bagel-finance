import { TonClient } from "@ton/ton";

let client: TonClient | null = null;

export const initializeTonClient = async (
  network: "mainnet" | "testnet" = "mainnet"
) => {
  if (!client) {
    client = new TonClient({
      endpoint:
        network === "mainnet"
          ? "https://toncenter.com/api/v2/jsonRPC"
          : "https://testnet.toncenter.com/api/v2/jsonRPC",
      apiKey: process.env.TONCENTER_API_KEY,
    });
  }
  return client;
};
