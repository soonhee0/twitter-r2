// api を呼び出す共通関数を定義
import { ApiUrl } from "../constants/url";

/**
 * @param urlSuffix - 呼び出したいAPIのパス（/api/hogehoge）
 * @param method - apiのhttpメソッド
 * @param cache - キャッシュの設定
 * @param body -リクエストボディに含める値
 */
// apiClient関数：APIを呼び出す際に共通して使用できる汎用的な関数
export const apiClient = async (
  urlSuffix: string,
  method: string,
  cache: RequestCache | undefined,
  body?: BodyInit | null | undefined
) => {
  const response = await fetch(ApiUrl.BASE_API_URL + urlSuffix, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    cache: cache,
    body: body,
  });

  // レスポンスが正しいかどうか確認
  if (response.ok) {
    try {
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  } else {
    console.error("API request failed:", response.status, response.statusText);
  }

  return response.json();
};
