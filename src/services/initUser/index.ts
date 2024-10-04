import { User as TgUser } from "@telegram-apps/sdk-react";
import { handleFailed, handleSucceed } from "..";
import { Login, Point, User } from "@prisma/client";

export async function initUser(
  tgUser: TgUser
): Promise<{ user: User; login: Login; point: Point }> {
  return fetch(`/api/users/${tgUser.id}/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tgUser),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
