import { handleFailed, handleSucceed } from "..";
import { Login, Point } from "@prisma/client";

export async function dailyLogin(body: {
  userId: string;
  bagel: number;
  bonusDay: number;
}): Promise<{ login: Login; point: Point }> {
  return fetch(`/api/users/${body.userId}/login/daily`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
