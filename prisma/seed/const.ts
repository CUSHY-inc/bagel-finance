export const userId = "99281932";

export const roundIds = ["round1", "round2", "round3"];

export const choiceIds = roundIds.map((_, idx) => [
  idx * 3 + 1,
  idx * 3 + 2,
  idx * 3 + 3,
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
