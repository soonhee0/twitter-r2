
const env = process.env.NEXT_PUBLIC_ENV;
// ApiUrl というオブジェクトを作成
export const ApiUrl = {
    // ローカル環境と本番環境の api の URL を環境変数によって取得する
  BASE_API_URL:
//   三項演算子：?の後ろが条件が true の場合に返す値で:の後ろが false の場合に返す値
    env !== "local"
      ? process.env.NEXT_PUBLIC_BASE_API_URL
      : "http://localhost:3000",
  API_UPLOAD_URL: env !== "local" ? "/v1/api/upload_url" : "/api/upload_url",
  API_DOWNLOAD_URL:
    env !== "local" ? "/v1/api/download_url" : "/api/download_url",
  API_CREATE_TWEET:
    env !== "local" ? "/v1/api/create_tweet" : "/api/create_tweet",
  API_FETCH_TWEET: env !== "local" ? "/v1/api/fetch_tweet" : "/api/fetch_tweet",
};