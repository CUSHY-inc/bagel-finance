export const userId = "6060318968";

export const roundIds = ["round1", "round2", "round3", "round4"];

export const choiceIds = roundIds.map((_, idx) => [
  `choice${idx * 3 + 1}`,
  `choice${idx * 3 + 2}`,
  `choice${idx * 3 + 3}`,
]);

export const tokens = [
  {
    id: "token1",
    name: "Bitcoin",
    symbol: "BTC",
    chain: "Bitcoin",
    coinGeckoId: "bitcoin",
  },
  {
    id: "token2",
    name: "Ethereum",
    symbol: "ETC",
    chain: "Ethereum",
    coinGeckoId: "ethereum",
  },
];
