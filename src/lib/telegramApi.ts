const baseUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function postTelegramApi(endpoint: string, params = {}) {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${baseUrl}${endpoint}${queryParams ? `?${queryParams}` : ""}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (e) {
    throw e;
  }
}
