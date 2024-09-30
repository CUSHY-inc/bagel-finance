import { Round, Choice, Vote, ChoiceToken, Token } from "@prisma/client";

type PreviousChoice = Round & { choices: Choice[]; votes: Vote[] };

type ChoiceWithDetails = Choice & {
  choiceTokens: (ChoiceToken & { token: Token })[];
};

type RoundInfo = Round & {
  choices: ChoiceWithDetails[];
};
