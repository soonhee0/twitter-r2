"use client";
import { AddPhotoAlternate } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Fab,
  Grid,
  Input,
  TextareaAutosize,
  styled,
} from "@mui/material";
// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { tweetData } from "../type/types";
import { useCreateTweet } from "./tweet.hooks.ts"; // useCreateTweetをインポート
const _CreateTweet = ({}) => {
  // handleSubmitActionを追加
  const { onChangeFileInput, binaryForImgData, image, handleSubmitAction } =
    useCreateTweet();

  const { register, handleSubmit, watch } = useForm<tweetData>();
  const [disable, setDisable] = useState(true);
  // useCreateTweetカスタムフックの呼び出し
  //   選択されたファイルを取得し、FileReader を使って読み込みする

  useEffect(() => {
    let len = watch("tweetContent.message").length;
    if (len === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("tweetContent.message")]);
  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: "90%",
    left: "80%",
    right: 0,
  });
  return (
    <>
      {/* 重要！！！onSubmitイベントが発生したときにhandleSubmitActionが呼び出されて実際の送信処理を行う */}
      <form onSubmit={handleSubmit(handleSubmitAction)}>
        <Grid container mt={1}>
          <Grid item xs={3}>
            <Link href="/home" style={{ textDecoration: "none" }}>
              <Button variant="text">キャンセル</Button>
            </Link>
          </Grid>

          <Grid item xs={9} sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              type="submit"
              style={{ borderRadius: "20px" }}
              disabled={disable}
            >
              投稿する
            </Button>
          </Grid>
        </Grid>
        <Avatar
          alt="Remy Sharp"
          src={
            "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1-768x768.png"
          }
        />
        <TextareaAutosize
          maxRows={4}
          placeholder="いまどうしてる？"
          style={{
            width: "100%",
            height: "20vh",
            outline: "none",
            border: "none",
            fontSize: "15pt",
          }}
          {...register("tweetContent.message", { required: true })}
        />
        {!!binaryForImgData && (
          // <img>LCP が遅く、帯域幅が広いとのエラーが出たため、修正
          <picture>
            <img
              // binaryForImgDataがある場合はプレビュー表示する
              src={`${binaryForImgData}`}
              alt="B64image"
              style={{ width: "100%", height: "40vh", objectFit: "contain" }}
            />
          </picture>
        )}
        <StyledFab color="primary" aria-label="add">
          {/* <label> タグは、htmlFor 属性を使って<Input>タグと紐付けられる */}
          {/* <label> をクリックするとファイル選択ダイアログが開く */}
          <label htmlFor="uploadButton">
            {/* ファイル選択のための非表示のインプットフィールド */}
            <Input
              id="uploadButton"
              type="file"
              // register 関数を使って、このフィールドをフォームデータとして登録
              {...register("tweetContent.imgName")}
              sx={{ display: "none" }}
              // ファイルがアップロードされたときのchangeイベントを監視
              onChange={onChangeFileInput}
            />
            <AddPhotoAlternate />
          </label>
        </StyledFab>
      </form>
    </>
  );
};

export default _CreateTweet;
