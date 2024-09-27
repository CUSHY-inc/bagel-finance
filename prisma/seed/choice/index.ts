import { prisma } from "..";
import { choiceIds, roundIds } from "../const";

export const choice = () => {
  const promise = prisma.choice.createMany({
    data: roundIds.flatMap((roundId, index) => {
      return choiceIds[index].map((choiceId) => {
        return {
          id: choiceId,
          roundId: roundId,
          title: choiceId,
        };
      });
    }),
  });
  return promise;
};
