import { handleFailed, handleSucceed } from "..";
import { User } from "@prisma/client";

export async function checkResult(body: {
  userId: string;
  roundId: string;
  isChecked: boolean;
}): Promise<User> {
  return fetch("/api/votes", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
