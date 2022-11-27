import localforage from "localforage";
import React, { useState, useEffect } from "react";
import { GameSettingHundler } from "../../../utils/main";
import { useNavigate } from "react-router-dom";

type GameSetting = {
  player: number;
  wolves: number;
  civil: number;
  timer: number;
};

type InputPlayerName = {
  [name: string]: string;
};

type ValidateStatus = {
  duplicate: boolean;
  countover: boolean;
};

export default function PlayerNameSetting() {
  const navigate = useNavigate();
  const initialInput = {};
  const TITLE: string = "プレイヤー名設定";
  const DB_GAMESETTING: string = "gameSetting";
  const DB_PLAYERLIST = "playerNameList";
  const [gameSetting, setGameSetting] = useState<GameSetting>();
  const [playerNumber, setPlayerNumber] = useState(0);
  const [inputValue, setInputValue] = useState<InputPlayerName>({});
  const [inputStatus, setInputStatus] = useState<ValidateStatus>({
    duplicate: true,
    countover: true,
  });

  const getGameSettingDB = async () => {
    const data: GameSetting | null = await localforage.getItem(DB_GAMESETTING);
    if (data == null) return;
    setGameSetting(data);
    setPlayerNumber(data.player);
    /*console.log("データをゲットしたなり");
    console.log("オブジェクトなり:", data);
    console.log(`プレイヤー数は${data.player}人なり`);
    */
  };

  useEffect(() => {
    getGameSettingDB();
  }, []);

  const createNameInputBox = () => {
    let box = [];
    let Nplayer: string = "";
    for (let i: number = 0; i < playerNumber; i++) {
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

  const checkDuplicate = (inputPlayerName: InputPlayerName): boolean => {
    const values = Object.values(inputPlayerName);
    const sv = new Set(values);
    // console.log(sv.size);
    // console.log(values.length);
    if (sv.size !== values.length) {
      return false;
    } else {
      return true;
    }
  };

  const checkCountOver = (inputPlayerName: InputPlayerName): boolean => {
    const values = Object.values(inputPlayerName);
    const r = values.find((v) => v.length > 10);
    if (r) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    try {
      const dupStatus: boolean = checkDuplicate(inputValue);
      const overStatus: boolean = checkCountOver(inputValue);
      if (dupStatus === false || overStatus === false) {
        setInputStatus({ duplicate: dupStatus, countover: overStatus });
        return undefined;
      }
      localforage.removeItem(DB_PLAYERLIST);
      await localforage.setItem(DB_PLAYERLIST, inputValue);
      await GameSettingHundler();
      navigate("/themecheck");
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
        {inputStatus.duplicate === false ? (
          <span className="border-2 rounded-md p-2 bg-red-500 mt-3 mb-3">
            同じ名前があるよ！
          </span>
        ) : (
          <span></span>
        )}
        {inputStatus.countover === false ? (
          <span className="border-2 rounded-md p-2 bg-red-500 mt-3 mb-3">
            10文字以内でお願い！
          </span>
        ) : (
          <span></span>
        )}
        <button
          onClick={() => handleSubmit()}
          className="p-2 rounded-md bg-teal-500/60"
        >
          ゲーム開始！
        </button>
      </div>
    </>
  );
}
