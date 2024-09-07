// 画像アップロード機能を作成するためのuseCreateTweetカスタムフックを定義
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { tweetData } from "../type/types";
import { apiClient } from "../utils/baseApi";
/** tweet生成するためのhooks */
export const useCreateTweet = () => {
  const id = uuidv4();
  // useRouterはNext.jsのルーティングにアクセスするためのフック
  const router = useRouter();
  // /** tweet生成のapi */　ホーム送信時のアクション
  const handleSubmitAction: SubmitHandler<tweetData> = async (
    tweet: tweetData
    // この関数は何も返さないことを示す
    // getUploadUrlがPromiseを返す
  ): Promise<void> => {
    // サーバーから画像のアップロード先のURLを取得

    const uploadUrl = await getUploadUrl(id);
    console.log("Upload URL:", uploadUrl);
    // 画像が選択されている場合ストレージにアップロードする
    if (image !== undefined && uploadUrl !== null) {
      putTweetImageToStorage(uploadUrl, image as Blob);
    }
    // ツイートデータを生成してAPIに送信する
    const tweetReqData = await createTweetRequestData(id, tweet);
    try {
      await apiClient(
        "/api/create_tweet",
        "POST",
        "no-store",
        JSON.stringify(tweetReqData)
      );
      // ツイート登録後は/homeに遷移させる
      router.push("/home");
      // router.pushはコンポーネントの状態を保持したまま画面遷移を行うため、データfetchが行われない。
      // そのため、refreshを用いてサーバーからデータをfetchし直すようにしている
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const [binaryForImgData, setBinay] = useState<
    //   binaryForImgDataは下のいずれかの値を持つことができる
    string | ArrayBuffer | null | undefined
  >(null);
  //   アップロードされた画像そのものを保存する状態
  const [image, setImage] = useState<Blob | undefined>();

  /** 画像アップロード時にプレビュー表示するためのhooks */
  const onChangeFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // "?."プロパティやメソッドが存在するかどうか確認しながらアクセスする
    if (event.target.files?.length === 0) {
      return;
    }
    // 選択されたファイルが画像ファイルであるかどうかを確認（image/* に一致するかチェック）
    if (!event.target.files?.[0].type.match("image.*")) {
      return;
    }
    // イメージの状態を保存
    setImage(event.target.files?.[0]);
    const reader = new FileReader();
    // FileReader を使って画像ファイルをBase64形式のデータに変換
    reader.readAsDataURL(event.target?.files[0]);
    // readAsDataURLでファイルを読み取ったときに、Base64エンコードされたデータURLをセットする。
    reader.onload = (e) => {
      setBinay(e.target?.result);
    };
  };
  return {
    onChangeFileInput,
    binaryForImgData,
    image,
    handleSubmitAction,
  };
};
// この関数はコンポーネント側から利用しないため、useCreateTweetの外に定義する。
const getUploadUrl = async (tweetId: string): Promise<string | null> => {
  // apiClient関数を利用して"/api/upload_url"エンドポイントにPostリクエストを送信
  const response = await apiClient(
    "/api/upload_url",
    "POST",
    "no-store",
    // APIにデータを送信するときにデータをJSON形式に変換して送信する
    JSON.stringify({ userId: "test@mail.com", tweetId })
  );
  return response.presignedUrl;
};
// 指定された uploadUrl に対して、画像データをアップロードする
const putTweetImageToStorage = async (
  uploadUrl: string,
  image: Blob
): Promise<void> => {
  // process.env.NEXT_PUBLIC_ENVがlocalかどうかをチェックする
  if (process.env.NEXT_PUBLIC_ENV === "local") {
    console.log("upload image to storage");
  } else {
    await fetch(uploadUrl, {
      method: "PUT",
      body: image,
    }).catch((e) => {
      throw new Error("Failed to upload image");
    });
  }
};
/** ツイート作成APIのリクエストデータを生成する関数 */
const createTweetRequestData = async (
  id: string,
  tweet: tweetData
): Promise<tweetData | null> => {
  const requestData = {
    id,
    tweetInfo: {
      userName: "testUserName",
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
    },
    tweetContent: {
      message: tweet.tweetContent.message,
      imgName: tweet.tweetContent.imgName,
    },
    tweetUserAction: {
      // 下記はデフォルト値
      good: "0",
      comments: [],
    },
    userId: "test@mail.com",
  };
  return requestData;
};
