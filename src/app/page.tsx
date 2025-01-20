"use client";
import { LoginButton } from "./_components/LoginButton";
import { WorryItem } from "./_components/WorryItem";
import { Toaster } from "react-hot-toast";
import { Section } from "./_components/(lp)/Section";
import { Step } from "./_components/(lp)/Step";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Home() {
  return (
    <div className="max-w-[480px] mx-auto pt-[60px] px-2">
      <Toaster position="top-center" />
      <div className="flex flex-col justify-center items-center gap-12 pt-10 pb-12">
        <div className="text-lg text-center">
          子供の長期休みをもっと楽しく！
          <br />
          宿題を自分からやりたくなるアプリ
        </div>
        <div className="text-4xl font-bold">kids planner</div>
        <LoginButton>Googleアカウントではじめる</LoginButton>
      </div>
      <div className="flex flex-col items-center gap-6 pb-20">
        <h2 className="text-2xl">長期休みの悩みあるある</h2>
        <ul className="text-sm flex flex-col gap-2">
          <WorryItem text="宿題やった？って聞きたくない" />
          <WorryItem text="宿題が多くて提出日を忘れる(夏)" />
          <WorryItem text="長期休みも勉強を習慣化してほしい" />
          <WorryItem text="宿題リストを手作りして貼っている" />
        </ul>
        <p className="font-bold text-xl">
          この悩み、kids plannerで解決します！
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 pb-6">
        <FontAwesomeIcon
          className="text-2xl text-accentBeige"
          icon={faPencil}
        />
        <h2 className="text-2xl font-bold">登録STEP</h2>
      </div>
      <div className="flex flex-col items-center gap-4 pb-20">
        <Step
          title="お子さまの設定"
          content="googleアカウントでログイン時に1人のお子さまが設定されます。"
          number="1"
        />
        <Step
          title="長期休暇の設定"
          content="お子さま毎に登録し、今現在の休暇を有効化してください。"
          number="2"
        />
        <Step
          title="宿題の登録"
          content="お子さまごとに管理したい宿題を登録してください。"
          number="3"
        />
      </div>

      <div className="flex flex-col gap-8">
        <Section title="ダッシュボード" imageSrc="/toppage/dashboard.jpg">
          <p className="text-center">
            休暇の残日数や宿題の進捗が
            <br />
            一目でわかるダッシュボード
          </p>
        </Section>

        <Section title="管理画面" imageSrc="/toppage/setting.jpg">
          <p className="text-center">
            お子さまの登録は人数制限なし
            <br />
            長期休暇毎に宿題管理ができる
          </p>
        </Section>
        <Section title="お子さま用画面" imageSrc="/toppage/child.jpg">
          <div className="flex flex-col gap-2">
            <p className="text-center">
              「できた」ボタンを押せば
              <br />
              顔文字が散って祝福する楽しい演出
            </p>
          </div>
        </Section>
        <Section title="宿題の登録" imageSrc="/toppage/homeworks.jpg">
          <p className="text-center">
            宿題登録や進捗の管理ができる
            <br />
            保護者用画面
          </p>
        </Section>

        <Section title="カレンダー" imageSrc="/toppage/calendar.jpg">
          <p className="text-center">
            お子さま別に色が設定できるカレンダー
            <br />
            宿題の一覧表示も可能
          </p>
        </Section>

        <Section title="印刷機能" imageSrc="/toppage/print.jpg">
          <p className="text-center">
            印刷画面のプレビュー表示
            <br />
            この画面からもカンタン印刷
          </p>
        </Section>
      </div>
      <div className="flex flex-col items-center gap-5 pb-20">
        <h3>親子で楽しく宿題管理してみませんか？</h3>
        <LoginButton>使ってみる</LoginButton>
      </div>
    </div>
  );
}
