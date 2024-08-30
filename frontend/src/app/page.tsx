// tweet 一覧画面へ遷移するための簡易ログイン画面
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";

const _Login = async () => {
  return (
    <Grid
      container
      style={{ backgroundColor: "black", width: "100%", minHeight: "100vh" }}
    >
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          <Button variant="contained">
            {/* ボタンを押して遷移するページ */}
            <Link
              href="/home"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </Button>
        </>
      </Grid>
    </Grid>
  );
};

export default _Login;