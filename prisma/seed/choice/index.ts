import { prisma } from "..";
import { choiceIds, roundIds } from "../const";

export const choice = () => {
  const promise = prisma.choice.createMany({
    data: roundIds.flatMap((roundId, index) => {
      return choiceIds[index].map((choiceId) => {
        return {
          roundId: roundId,
          title: `choice${choiceId}`,
          image: "/images/btc-eth-index.png",
          result: choiceId % 3 === 1 ? 10 : -5,
          isWinner: choiceId % 3 === 1,
          voteRate: 33.3,
        };
      });
    }),
  });
  return promise;
};
