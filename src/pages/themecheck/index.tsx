import { useState } from "react";

export default function ThemeCheck() {
  const [ readyflag, setReadyFlag ] = useState(false);
  
  return (
    <>
      <header className="text-center pt-10 pb-10">
        <h1 className="font-bold font-mplus">お題</h1>
      </header>
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-2 items-center">
          <span className="font-mplus text-3xl font-bold pb-10">A</span>
          <span className="font-mplus text-2xl font-bold pb-10">さん</span>
        </div>
        <span className="font-mplus text-2xl">準備はいいですか？</span>
        <div className="pt-10">
          <button className="border-2 p-2 rounded-md border-blue-300">
            お題を表示
          </button>
        </div>
      </div>
    </>
  );
}
