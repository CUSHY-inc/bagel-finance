import { prisma } from "..";
import { userId } from "../const";

export const user = () => {
  const promise = prisma.user.createMany({
    data: [
      {
        id: userId,
        username: "",
        firstName: "",
        lastName: "",
        languageCode: "",
      },
    ],
  });
  return promise;
};
