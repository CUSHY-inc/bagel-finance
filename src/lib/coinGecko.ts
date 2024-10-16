const baseUrl = "https://api.coingecko.com/api/v3";

export async function fetchCoinGecko(endpoint: string, params = {}) {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${baseUrl}${endpoint}${queryParams ? `?${queryParams}` : ""}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY ?? "",
      },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (e) {
    throw e;
  }
}
