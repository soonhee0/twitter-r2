"use client";

import { tweetData } from "@/app/type/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Skeleton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useFetchTweetImage } from "./tweetCard.hooks";
type Props = {
  // 親コンポーネントから受け取ったツイートデータ
  tweet: tweetData;
};

export const TweetCard = (props: Props) => {
  // useStateの1つ目が状態を表すステートで2つ目が状態を更新する関数
  //   anchorElは、メニューを開くときにどの要素をアンカー（基準）にするかを指定するためのもの
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  //   open はメニューが開いているかどうかを示すブール値
  const open = Boolean(anchorEl);
  //   メニューを開くための関数　クリックされた要素をanchorElにセットする
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  //   メニューを閉じるための関数　anchorElをnullにする
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { imageUrl } = useFetchTweetImage(props.tweet);
  return (
    <Card>
      <CardHeader
        avatar={
          // ツイートしたユーザーの画像
          <Avatar
            alt="Remy Sharp"
            // TODO: ログイン機能を実装したらユーザーの画像が表示されるように更新する
            src={
              "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1-768x768.png"
            }
          />
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClick}>
              {/* MoreVertIcon は設定アイコン　クリックするとアイコンを開く */}
              <MoreVertIcon />
            </IconButton>
            {/* クリックされた要素を基準に開くメニュー */}
            {/* StyledMenuが実装されてからコメントオフにする */}
            {/* <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem style={{ color: "red" }}>削除</MenuItem>
            </StyledMenu> */}
          </>
        }
        title={props.tweet.tweetInfo.userName}
        subheader={props.tweet.tweetInfo.createdAt}
      />
      <CardContent sx={{ mr: 3, ml: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {props.tweet.tweetContent.message}
        </Typography>
      </CardContent>
      {imageUrl ? (
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt="image"
          style={{ objectFit: "contain" }}
        />
      ) : (
        <Skeleton variant="rectangular" height={200} />
      )}
      <CardActions sx={{ mr: 3, ml: 3 }}></CardActions>
    </Card>
  );
};
