// 定義した型情報の読み込み
import { tweetData, tweetsData } from "../type/types";
// APIを呼び出すための共通関数の読み込み
import { apiClient } from "../utils/baseApi";
// カスタムフックの定義
// userIdsに基づいてツイートデータを取得する関数
export const useFetchTweetsData = (userIds: string[]) => {
  // fetchTweetsDataが呼び出されるとAPIの処理が呼び出される
  const fetchTweetsData = async (): Promise<tweetData[]> => {
    const tweetsData: tweetsData = await apiClient(
      // /api/fetch_tweetというエンドポイントに対してPOSTリクエストを送信
      "/api/fetch_tweet",
      "POST",
      // キャッシュオプション
      "no-store",
      // リクエストボディ
      JSON.stringify({ userIds: userIds })
    );
    // console.log("API Response:", JSON.stringify(tweetsData, null, 2));
    console.log("API Response:", tweetsData);
    return tweetsData.tweets;
  };
  console.log("{ fetchTweetsData }:", { fetchTweetsData });
  return { fetchTweetsData };
};
