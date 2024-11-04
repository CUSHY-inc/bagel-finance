import { TonClient } from "@ton/ton";
import { getHttpEndpoint, Network } from "@orbs-network/ton-access";

let client: TonClient | null = null;

export const initializeTonClient = async (network: Network = "mainnet") => {
  if (!client) {
    const endpoint = await getHttpEndpoint({ network });
    client = new TonClient({ endpoint });
  }
  return client;
};
