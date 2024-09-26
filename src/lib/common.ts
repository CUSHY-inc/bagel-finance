export const shortenStr = (
  str: string | null | undefined,
  startLength: number,
  endLength: number = 0
) => {
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
};
