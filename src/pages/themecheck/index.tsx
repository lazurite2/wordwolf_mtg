import localforage from "localforage";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

type PlayerDetails = {
  name: string;
  theme: string;
  role: string;
};

type GameInfo = {
  player: PlayerDetails[];
  timer: number;
};

export default function ThemeCheck() {
  const navigate = useNavigate();
  const initialGameInfo: GameInfo = {
    player: [],
    timer: 0,
  };
  const [gameInfo, setGameInfo] = useState<GameInfo>();
  const [readyFlag, setReadyFlag] = useState(false);
  const [playerIndex, setPlayerIndex] = useState(0);

  /*const getDetails = async () => {
    const r: GameInfo | null = await localforage.getItem("playerDetails");
    if (r == null) return undefined;
    setGameInfo(r); 
  }*/

  useLayoutEffect(() => {
    (async () => {
      const r: GameInfo | null = await localforage.getItem("playerDetails");
      if (r != null) {
        setGameInfo(r);
      }
    })();
    // console.log(gameInfo);
  }, []);

  const addIndexNumber = (i: number, playerLength: number): void => {
    if (playerIndex < playerLength) {
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
      <header className="text-center pb-10">
        <h1 className="text-white font-bold">お題</h1>
      </header>
      {(() => {
        if (gameInfo != null && readyFlag === false && playerIndex < gameInfo.player.length) {
          return (
            <div className="flex flex-col items-center text-white">
              <div className="flex gap-2 items-center">
                <span className="text-2xl font-bold pb-10">
                  {gameInfo.player[playerIndex].name}
                </span>
                <span className="text-2xl pb-10">さんが</span>
              </div>
              <span className="text-2xl">この画面を見てください </span>
              <span className="text-2xl">準備はいいですか？</span>
              <div className="pt-10">
                <button
                  onClick={() => flagHundler()}
                  className="p-3 border-2 border-solid border-blue-700 rounded-lg"
                >
                  準備OK
                </button>
              </div>
            </div>
          );
        } else if (gameInfo != null && readyFlag === true && playerIndex < gameInfo.player.length) {
          return (
            <div className="flex flex-col items-center text-white">
              <span className="text-2xl pb-5">あなたのお題は</span>
              <div className="flex pb-10">
                <span className="text-2xl font-bold">
                  {`「${gameInfo.player[playerIndex].theme}」`}
                </span>
              </div>
              <button
                onClick={() => {
                  flagHundler();
                  addIndexNumber(playerIndex, gameInfo.player.length);
                }}
                className="p-3 border-2 border-solid border-blue-700 rounded-lg"
              >
                覚えた！
              </button>
            </div>
          );
        } else if (gameInfo != null && playerIndex === gameInfo.player.length) {
          return (
            <div className="pt-10 flex justify-center text-white">
              <button
                className="p-4 border-2 border-solid border-blue-700 rounded-lg"
                onClick={() => navigate("/talktimer", { state: gameInfo })}
              >
                トーク開始！
              </button>
            </div>
          );
        }
      })()}
    </>
  );
}
