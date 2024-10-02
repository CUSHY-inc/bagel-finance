import { handleFailed, handleSucceed } from "..";
import { Wallet } from "@prisma/client";

export async function upsertWallet(body: {
  userId: string;
  address: string;
  humanReadable: string;
}): Promise<Wallet> {
  return fetch(`/api/users/${body.userId}/wallet`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
