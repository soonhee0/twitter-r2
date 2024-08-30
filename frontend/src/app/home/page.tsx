import { Grid } from "@mui/material";
// 作成したFooterコンポーネントの読み込み
import { Footer } from "../components/elements/footer/footer";
// 作成したHeaderコンポーネントの読み込み
import { TweetCard } from "../components/container/tweetCard/tweetCard";
import { Header } from "../components/elements/header/header";
import { useFetchTweetsData } from "./home.hooks";
const Home = async () => {
  // TODO: useFetchTweetsDataの引数はログイン機能実行あとにuserのメアドを引数に渡せるように更新する
  // useFetchTweetsDataはカスタムフック ツイートデータを取得する機能を提供する
  // オブジェクトの分割代入
  // useFetchTweetsData(["test@mail.com"]) の返り値であるオブジェクトから fetchTweetsData プロパティを取り出し、それを変数 fetchTweetsData に格納
  const { fetchTweetsData } = useFetchTweetsData(["testUserId"]);
  // 取得したtツイートデータが変数tweetsDataに格納される
  const tweetsData = await fetchTweetsData();
  // 一旦console.logでコマンドプロンプトやbashなどの`npm run dev`を実行しているところでレスポンスデータを確認してみましょう
  console.log("tweetsData:", tweetsData);
  console.log("TweetCard:", TweetCard);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {/* Headerコンポーネントの利用 */}
          <Header />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "60px" }}>
        <Grid item xs={12}>
          {/* tweetsData が空でない場合に、ツイートを一覧表示する */}
          {/* tweetsData配列の各要素にTweetCardコンポーネントが作られる */}
          {/* key={data.id}でTweetCardにidを割り当て */}
          {/* dataオブジェクトをTweetCardコンポーネントのtweetプロップスとして渡している */}
          {tweetsData.length !== 0 &&
            tweetsData.map((data) => <TweetCard key={data.id} tweet={data} />)}
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "50px" }}>
        <Grid item xs={12}>
          {/* Footerコンポーネントの利用 */}
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
