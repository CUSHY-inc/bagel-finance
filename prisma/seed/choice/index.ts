import { prisma } from "..";
import { choiceIds, roundIds } from "../const";

export const choice = () => {
  const promise = prisma.choice.createMany({
    data: roundIds.flatMap((roundId, index) => {
      return choiceIds[index].map((choiceId, idx) => {
        return {
          id: choiceId,
          roundId: roundId,
          idx: idx + 1,
          title: `Super index No. ${index * 3 + idx}`,
          image: "/images/seed-index.png",
          description: `The Super Hyper Ultra Mega Epic Awesome Index No. ${choiceId}`,
          result: index < 2 ? ((index * 3 + idx) % 3 === 1 ? 10 : -5) : null,
          isWinner: index < 2 ? (index * 3 + idx) % 3 === 1 : null,
          voteRate: index < 2 ? 33.3 : null,
        };
      });
    }),
  });
  return promise;
};
