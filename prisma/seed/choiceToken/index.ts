import { prisma } from "..";
import { choiceIds, tokens } from "../const";

export const choiceToken = () => {
  const promise = prisma.choiceToken.createMany({
    data: choiceIds
      .flat()
      .flatMap((choiceId) =>
        tokens.map((token) => ({
          choiceId,
          tokenId: token.id,
          proportion: 100 / tokens.length,
        }))
      ),
  });
  return promise;
};
