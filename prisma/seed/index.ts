import { PrismaClient } from "@prisma/client";
import { user } from "./user";
import { round } from "./round";
import { choice } from "./choice";
import { token } from "./token";
import { choiceToken } from "./choiceToken";
import { vote } from "./vote";
import { point } from "./point";
import { login } from "./login";
import { pack } from "./pack";
import { task } from "./task";

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
    point(),
    login(),
    pack(),
    task(),
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
