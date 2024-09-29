import { Round, Choice, Vote } from "@prisma/client";

type PreviousChoice = Round & { choices: Choice[]; votes: Vote[] };
