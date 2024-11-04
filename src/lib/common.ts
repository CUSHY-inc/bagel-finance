export function shortenStr(
  str: string | null | undefined,
  startLength: number,
  endLength: number = 0
) {
  if (!str) {
    return "";
  }
  if (str.length <= startLength + endLength + 1) {
    return str;
  }
  return `${str.slice(0, startLength)}...${str.slice(
    str.length - endLength,
    str.length
  )}`;
}

export function getPeriodString(startDate: Date, endDate: Date) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startMonth = start?.toLocaleString("en-US", { month: "short" });
  const startDay = start?.toLocaleString("en-US", { day: "numeric" });
  const startTime = start?.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const endTime = end?.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return {
    date: `${startMonth}. ${startDay}`,
    time: `${startTime} ~ ${endTime}`,
  };
}

export function dateToTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export function formatNumber(value: number): string {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + "B";
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + "M";
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + "K";
  } else {
    return value.toString();
  }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomUint64(): bigint {
  const maxUint64 = BigInt("0xFFFFFFFFFFFFFFFF");
  return BigInt.asUintN(
    64,
    BigInt(Math.floor(Math.random() * Number(maxUint64)))
  );
}
