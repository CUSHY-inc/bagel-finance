import { prisma } from "..";
import { userId } from "../const";

export const point = () => {
  const promise = prisma.point.createMany({
    data: [{ userId, bagel: BigInt(1200) }],
  });
  return promise;
};
