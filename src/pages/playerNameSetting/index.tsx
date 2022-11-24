import localforage from "localforage";
import React, { useState, useEffect } from "react";
import { GameSettingHundler } from "../../../utils/main";

type GameSetting = {
  player: number;
  wolves: number;
  civil: number;
  timer: number;
};

type InputPlayerName = {
  [name: string]: string;
};

export default function PlayerNameSetting() {
  const initialInput = {};
  const TITLE: string = "プレイヤー名設定";
  const DB_GAMESETTING: string = "gameSetting";
  const DB_PLAYERLIST = "playerNameList";
  const [gameSetting, setGameSetting] = useState<GameSetting>();
  const [playerNumber, setPlayerNumber] = useState(0);
  const [inputValue, setInputValue] = useState<InputPlayerName>({});
  const [inputStatus, setInputStatus] = useState(true);

  const getGameSettingDB = async () => {
    const data: GameSetting | null = await localforage.getItem(DB_GAMESETTING);
    if (data == null) return;
    setGameSetting(data);
    setPlayerNumber(data.player);
    console.log("データをゲットしたなり");
    console.log("オブジェクトなり:", data);
    console.log(`プレイヤー数は${data.player}人なり`);
  };
  const watchDB = async () => {
    const pValue = await localforage.getItem(DB_PLAYERLIST);
    if (pValue) {
      console.log("プレイヤー名：", pValue);
    }
  };

  useEffect(() => {
    watchDB();
  }, []);
  useEffect(() => {
    getGameSettingDB();
  }, []);

  const createNameInputBox = () => {
    let box = [];
    let Nplayer: string = "";
    for (let i = 0; i < playerNumber; i++) {
      Nplayer = "player" + (i + 1);
      box.push(
        <input
          type="text"
          key={i}
          name={`player${i + 1}`}
          value={inputValue[Nplayer] === undefined ? "" : inputValue[Nplayer]}
          className="border-2 rounded-md my-3 p-2"
          placeholder={`プレイヤー${i + 1}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e)
          }
        />
      );
    }
    return box;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === "text" ? target.value : "";
    const name = target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  const checkInputValue = () => console.log(inputValue);

  const handleSubmit = async () => {
    try {
      checkInputValue();
      localforage.removeItem(DB_PLAYERLIST);
      await localforage.setItem(DB_PLAYERLIST, inputValue);
      await GameSettingHundler();
      //localforage.clear()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header className="text-center pt-20 pb-10">
        <h1 className="font-bold">{TITLE}</h1>
      </header>

      <div className="flex flex-col justify-center items-center">
        {createNameInputBox()}
      </div>
      <div className="flex justify-center pt-5">
        <button
          onClick={() => handleSubmit()}
          className="p-2 rounded-md bg-teal-500/60"
          disabled={false}
        >
          ゲーム開始！
        </button>
      </div>
    </>
  );
}
