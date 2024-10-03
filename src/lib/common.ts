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

export function getPeriodString(startDate?: Date, endDate?: Date) {
  const startMonth = startDate?.toLocaleString("en-US", { month: "short" });
  const startDay = startDate?.toLocaleString("en-US", { day: "numeric" });
  const startTime = startDate?.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const endTime = endDate?.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return {
    date: `${startMonth}. ${startDay}`,
    time: `${startTime} ~ ${endTime}`,
  };
}
