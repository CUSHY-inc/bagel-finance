import { TonClient } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";

let client: TonClient | null = null;

export const initializeTonClient = async () => {
  if (!client) {
    const endpoint = await getHttpEndpoint();
    client = new TonClient({ endpoint });
  }
  return client;
};
