import { prisma } from "..";
import { userId } from "../const";

export const vote = () => {
  const promise = prisma.vote.createMany({
    data: [
      {
        userId,
        roundId: "round1",
        choiceId: 1,
        bet: 1000,
        isCorrect: true,
        payout: 3000,
      },
      {
        userId,
        roundId: "round2",
        choiceId: 5,
        bet: 1000,
        isCorrect: false,
        payout: 0,
      },
    ],
  });
  return promise;
};
