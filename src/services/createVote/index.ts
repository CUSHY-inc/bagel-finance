import { handleFailed, handleSucceed } from "..";
import { User } from "@prisma/client";

export async function createVote(body: {
  userId: string;
  roundId: string;
  choiceId: number;
  bet: number;
}): Promise<User> {
  return fetch("/api/votes/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
