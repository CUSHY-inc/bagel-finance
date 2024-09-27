import { prisma } from "..";
import { userId } from "../const";

export const vote = () => {
  const promise = prisma.vote.createMany({
    data: [
      {
        userId,
        roundId: "round1",
        choiceId: "choice1",
      },
      {
        userId,
        roundId: "round2",
        choiceId: "choice5",
      },
      {
        userId,
        roundId: "round3",
        choiceId: "choice9",
      },
    ],
  });
  return promise;
};
