export const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        error.message || "An error occurred while fetching the data."
      );
    }
    return res.json();
  });
