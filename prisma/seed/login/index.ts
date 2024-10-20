import { prisma } from "..";
import { userId } from "../const";

export const login = () => {
  const promise = prisma.login.createMany({
    data: [
      { userId, lastBonusDate: new Date(), bonusDay: 1, sentWelcomeMsg: true },
    ],
  });
  return promise;
};
