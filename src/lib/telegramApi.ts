const baseUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function postTelegramApi(endpoint: string, params = {}) {
  try {
    let queryParams = new URLSearchParams(params).toString();
    queryParams = queryParams.replace(/\+/g, "%20");
    const url = `${baseUrl}${endpoint}${queryParams ? `?${queryParams}` : ""}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) {
      console.log(url);
      const json = await response.json();
      throw new Error(`${json.error_code} ${json.description}`);
    }
    return await response.json();
  } catch (e) {
    throw e;
  }
}
