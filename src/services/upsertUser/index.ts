import { User as TgUser } from "@telegram-apps/sdk-react";
import { handleFailed, handleSucceed } from "..";
import { User } from "@prisma/client";

export async function upsertUser(tgUser: TgUser): Promise<User> {
  return fetch(`/api/users/${tgUser.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tgUser),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
