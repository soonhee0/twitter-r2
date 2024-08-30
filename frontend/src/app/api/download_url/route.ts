// Next.js の API Route で POST リクエストを処理する
// POSTリクエストを受け取ったときに、常に同じレスポンス (presignedUrl) を返す
import { NextRequest, NextResponse } from "next/server";

// クライアントからPOSTリクエストを受け取る
export function POST(request: NextRequest) {
  // リクエストボディをjsonとして解析する
  const requestBody = request.json();

  return NextResponse.json({
    // presignedUrlは画像のURL
    presignedUrl:
      "https://news.walkerplus.com/article/1023800/10210444_615.jpg",
  });
}
