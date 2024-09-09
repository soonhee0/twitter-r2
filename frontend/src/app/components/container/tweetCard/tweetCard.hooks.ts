// API をたたくカスタム hooks
import { tweetData } from "@/app/type/types";
import { apiClient } from "@/app/utils/baseApi";
import { useEffect, useState } from "react";
// ツイートに関連する画像のURLを取得して、それを状態に保存するために設計されたフック
export const useFetchTweetImage = (tweet: tweetData) => {
  // 画像URLを保存するimageUrlを状態管理
  const [imageUrl, setImageUrl] = useState<string>("");
  //   useFetchTweetImageフックを使用したコンポーネントがマウントされる時に、API呼び出しを行い
  //   画像URLを取得する
  useEffect(() => {
    if (tweet.tweetContent.imgName === "") return; // 画像名が空であればAPI呼び出しをしない
    console.log("userId:", tweet.userId); // userIdをログに出力
    console.log("tweetId:", tweet.id); // tweetIdをログに出力

    const fetchImage = async () => {
      const res = await apiClient(
        "/api/download_url",
        "POST",
        "force-cache", // キャッシュを利用して値を返す
        JSON.stringify({
          userId: tweet.userId,
          tweetId: tweet.id,
        })
      );

      setImageUrl(res.presignedUrl); // 取得した画像URLを状態にセットする
    };
    // APIを呼び出すための非同期関数
    fetchImage();
    // tweetオブジェクトが変更された場合に再度APIを呼び出す
  }, [tweet]);

  return { imageUrl };
};
