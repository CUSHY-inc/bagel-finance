import { Round, Choice, Vote, ChoiceToken, Token } from "@prisma/client";

type PreviousChoice = Round & { choices: Choice[]; votes: Vote[] };

type ChoiceTokenWithToken = ChoiceToken & { token: Token };

type ChoiceWithDetails = Choice & {
  choiceTokens: ChoiceTokenWithToken[];
};

type RoundChoiceWithDetails = ChoiceWithDetails & {
  round: Round;
};

type RoundInfo = Round & {
  choices: ChoiceWithDetails[];
};

type VoteWithDetails = Vote & {
  round: Round;
  choice: ChoiceWithDetails;
};

type RoundInfoWithVotesWithDetails = RoundInfo & {
  votes: VoteWithDetails[];
};

type HomeInfo = {
  currentRound: RoundInfoWithVotesWithDetails;
  nextRound: RoundInfoWithVotesWithDetails;
  point: Point;
};
