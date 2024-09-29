import { prisma } from "..";
import { userId } from "../const";

export const user = () => {
  const promise = prisma.user.createMany({
    data: [
      {
        id: userId,
        username: "ruemura3",
        firstName: "Ryo",
        lastName: "Fujita",
        languageCode: "en",
      },
    ],
  });
  return promise;
};
