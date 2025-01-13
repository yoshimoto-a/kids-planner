import { getCurrentUser } from "@/app/api/_utils/getCurrentUser";
import chromium from "@sparticuz/chromium";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import { Response } from "@/app/_types/image/Response";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const GET = async (request: NextRequest, { params }: Props) => {
  await getCurrentUser({ request });
  const { id } = await params;

  // ブラウザを起動
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
  // ブラウザのタブを開く
  const page = await browser.newPage(); // スクショ対象のページにアクセス

  await page.goto(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/homework/children/${id}`
  );

  // ページの表示が完了するまで待つ
  await page.waitForSelector("body", { visible: true });

  // サイズを指定してスクショを撮ってbase64方式の画像データを取得
  const image = await page.screenshot({
    encoding: "base64",
    fullPage: false,
    clip: { x: 0, y: 0, width: 630, height: 891 },
  });
  // ブラウザを閉じる
  await browser.close();

  // 取得した画像データをクライアントに返す
  try {
    return NextResponse.json<Response>({ image }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
};
