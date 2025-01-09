"use client";
import { LoginButton } from "./_components/LoginButton";
import { WorryItem } from "./_components/WorryItem";
import { Title } from "./_components/Title";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
export default function Home() {
  return (
    <div className="max-w-[480px] mx-auto pt-[60px] px-2">
      <Toaster position="top-center" />
      <div className="flex flex-col justify-center items-center gap-12 pt-10">
        <div className="text-lg text-center">
          子供の長期休みをもっと楽しく！
          <br />
          宿題を自分からやりたくなるアプリ
        </div>
        <div className="text-4xl">kids planner</div>
        <LoginButton>Googleアカウントではじめる</LoginButton>
        <div className="flex flex-col items-center gap-4">
          <Title>長期休みの悩みあるある</Title>
          <ul className="text-sm flex flex-col gap-2">
            <WorryItem text="宿題やった？って聞きたくない" />
            <WorryItem text="宿題が多くて提出日を忘れる(夏)" />
            <WorryItem text="長期休みも勉強を習慣化してほしい" />
            <WorryItem text="宿題リストを手作りして貼っている" />
          </ul>
          <p>この悩み、kids plannerで解決します！</p>
        </div>
        <div className="flex flex-col gap-2">
          <Title>保護者用画面</Title>
          <p className="text-center">
            子供は何人でも登録可能
            <br />
            もちろん子供毎の宿題進捗管理
          </p>
          <Image
            src={"/toppage/admin.png"}
            alt="保護者画面"
            width={400}
            height={800}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Title>子供操作用の画面</Title>
          <p className="text-center">
            シール貼りたい、トイレに貼りたい
            <br />
            紙媒体へのニーズに合わせた印刷機能
          </p>
          <Image
            src={"/toppage/child.png"}
            alt="子供操作画面"
            width={400}
            height={800}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl text-center">「できた」押したくなるボタン</h2>
          <p className="text-center">
            宿題が一つできるごとに押せるボタン
            <br />
            絵文字が飛び散り、喜ぶこと間違いなし
          </p>
          <Image
            src={"/toppage/done.png"}
            alt="done"
            width={400}
            height={800}
          />
        </div>
        <div className="flex flex-col items-center gap-5 pb-5">
          <h3>親子で楽しく宿題管理してみませんか？</h3>
          <LoginButton>使ってみる</LoginButton>
        </div>
      </div>
    </div>
  );
}
