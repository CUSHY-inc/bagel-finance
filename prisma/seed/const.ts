export const userId = "6060318968";

export const roundIds = ["round1", "round2", "round3", "round4"];

export const choiceIds = roundIds.map((roundId) => [
  `${roundId}-1`,
  `${roundId}-2`,
  `${roundId}-3`,
]);

export const tokens = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    webSlug: "bitcoin",
    image:
      "https://coin-images.coingecko.com/coins/images/1/thumb/bitcoin.png?1696501400",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    webSlug: "ethereum",
    image:
      "https://coin-images.coingecko.com/coins/images/279/thumb/ethereum.png?1696501628",
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "usdt",
    webSlug: "tether",
    image:
      "https://coin-images.coingecko.com/coins/images/325/thumb/Tether.png?1696501661",
  },
];
