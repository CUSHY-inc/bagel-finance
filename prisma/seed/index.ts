import { PrismaClient } from "@prisma/client";
import { user } from "./user";
import { round } from "./round";
import { choice } from "./choice";
import { token } from "./token";
import { choiceToken } from "./choiceToken";
import { vote } from "./vote";

export const prisma = new PrismaClient();

const main = async () => {
  console.log(`Start seeding ...`);
  await prisma.$transaction([
    user(),
    round(),
    choice(),
    token(),
    choiceToken(),
    vote(),
  ]);
  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
