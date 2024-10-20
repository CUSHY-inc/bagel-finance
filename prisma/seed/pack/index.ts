import { prisma } from "..";

export const pack = () => {
  const promise = prisma.pack.createMany({
    data: [
      {
        id: "tasty-bagel-pack",
        title: "Tasty Bagel Pack",
        description: "Tasty Bagel Pack",
        usd: 19.8,
        stars: 1000,
        utility: { autoPick: 7, earningMultiplier: 1, airdrop: 19.8 },
      },
    ],
  });
  return promise;
};
