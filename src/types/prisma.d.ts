import {
  Round,
  Choice,
  Vote,
  ChoiceToken,
  Token,
  User,
  Login,
  Point,
  Task,
  UserTask,
} from "@prisma/client";

type PreviousChoice = Round & { choices: Choice[]; votes: Vote[] };

type ChoiceTokenWithToken = ChoiceToken & { token: Token };

type ChoiceWithDetails = Choice & {
  choiceTokens: ChoiceTokenWithToken[];
};

type RoundChoiceWithDetails = ChoiceWithDetails & {
  round: Round;
  votes: Vote[];
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

type UserWithLogin = User & {
  login: Login;
};

type FrenWithUser = Fren & {
  fren: User;
};

type TaskWithUserTasks = Task & {
  userTasks: UserTask[];
};
