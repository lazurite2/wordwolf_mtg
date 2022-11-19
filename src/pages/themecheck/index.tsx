import { useState } from "react";

type playerObj = {
  id: number;
  name: string;
  theme: string;
  role: string;
};

type testObject = {
  player: playerObj[];
  timer: number;
};

export default function ThemeCheck() {
  const test: testObject = {
    player: [
      { id: 1, name: "A", theme: "稲妻", role: "wolf" },
      { id: 2, name: "B", theme: "ショック", role: "civil" },
      { id: 3, name: "C", theme: "ショック", role: "civil" },
      { id: 4, name: "D", theme: "ショック", role: "civil" },
      { id: 5, name: "E", theme: "ショック", role: "civil" },
      { id: 6, name: "F", theme: "稲妻", role: "wolf" },
    ],
    timer: 3,
  };

  const [readyFlag, setReadyFlag] = useState(false);
  const [playerIndex, setPlayerIndex] = useState(0);

  const addIndexNumber = (i: number) => {
    if (playerIndex < test.player.length) {
      i = i + 1;
      setPlayerIndex(i);
    }
  };

  const flagHundler = () => {
    if (readyFlag === false) {
      setReadyFlag(true);
    } else if (readyFlag === true) {
      setReadyFlag(false);
    }
  };

  return (
    <>
      <header className="text-center pt-32 pb-10">
        <h1 className="font-bold">お題</h1>
      </header>
      {(() => {
        if (readyFlag === false && playerIndex < test.player.length) {
          return (
            <div className="flex flex-col items-center">
              <div className="flex gap-2 items-center">
                <span className="text-2xl font-bold pb-10">
                  {test.player[playerIndex].name}
                </span>
                <span className="text-2xl pb-10">さんが</span>
              </div>
              <span className="text-2xl">この画面を見てください </span>
              <span className="text-2xl">準備はいいですか？</span>
              <div className="pt-10">
                <button
                  onClick={() => flagHundler()}
                  className="p-2 bg-teal-500/60 rounded-md"
                >
                  準備OK
                </button>
              </div>
            </div>
          );
        } else if (readyFlag === true && playerIndex < test.player.length) {
          return (
            <div className="flex flex-col items-center">
              <span className="text-2xl pb-5">あなたのお題は</span>
              <div className="flex pb-10">
                <span className="text-2xl">「</span>
                <span className="text-2xl font-bold">
                  {test.player[playerIndex].theme}
                </span>
                <span className="text-2xl">」です</span>
              </div>
              <button
                onClick={() => {
                  flagHundler();
                  addIndexNumber(playerIndex);
                }}
                className="p-2 bg-teal-500/60 rounded-md"
              >
                覚えた
              </button>
            </div>
          );
        } else if (playerIndex === test.player.length) {
         return (
          <div className="pt-10 flex justify-center">
            <button className="p-4 bg-teal-500/60 rounded-md">トーク開始！</button>
          </div>
         );
        }
      })()}
    </>
  );
}
