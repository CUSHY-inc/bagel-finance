import { prisma } from "..";
import { userId } from "../const";

export const vote = () => {
  const promise = prisma.vote.createMany({
    data: [
      {
        userId,
        roundId: "round1",
        choiceId: "round1-1",
        bet: 1000,
        isCorrect: true,
        payout: 3000,
        isChecked: true,
      },
      {
        userId,
        roundId: "round2",
        choiceId: "round2-2",
        bet: 1000,
        isCorrect: false,
        payout: 0,
        isChecked: true,
      },
    ],
  });
  return promise;
};
