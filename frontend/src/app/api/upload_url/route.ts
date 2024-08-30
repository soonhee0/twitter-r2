// 署名付き URL のモックAPIを作成
// POSTリクエストが来たときに、そのリクエストの内容を受け取りつつ、指定のURLに返す関数
import { NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest) {
  // クライアントから送られてきたリクエストのボディを取り出す
  const body = request.body;
  return NextResponse.json({
    // presignedUrl: "http://localhost:3000/api/upload_url",
    presignedUrl: "http://localhost:3000/api/uploadImage",
  });
}
