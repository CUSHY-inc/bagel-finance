import { prisma } from "..";
import { tokens } from "../const";

export const token = () => {
  const promise = prisma.token.createMany({
    data: tokens,
  });
  return promise;
};
