import { prisma } from "..";
import { roundIds } from "../const";

const threeHours = 3 * 60 * 60 * 1000;
const startDate = new Date();
startDate.setHours(startDate.getHours() - 7);
startDate.setMinutes(0, 0, 0);

export const round = () => {
  const promise = prisma.round.createMany({
    data: roundIds.map((roundId, idx) => {
      return {
        id: roundId,
        title: roundId,
        startDate: new Date(startDate.getTime() + idx * threeHours),
        endDate: new Date(startDate.getTime() + idx * threeHours + threeHours),
      };
    }),
  });
  return promise;
};
