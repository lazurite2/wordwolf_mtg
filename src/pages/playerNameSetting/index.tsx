import localforage from "localforage";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { GameSettingHundler } from "../../../utils/main";
import { useNavigate, useLocation } from "react-router-dom";

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
  valueexist: boolean;
};

export default function PlayerNameSetting() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialInput = {};
  const TITLE: string = "プレイヤー名設定";
  const DB_GAMESETTING: string = "gameSetting";
  const DB_PLAYERLIST = "playerNameList";
  const [gameSetting, setGameSetting] = useState<GameSetting>();
  const [playerNumber, setPlayerNumber] = useState<number>(location.state);
  const [inputArray, setInputArray] = useState<number[]>([]);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<InputPlayerName>({});
  const [inputStatus, setInputStatus] = useState<ValidateStatus>({
    duplicate: true,
    countover: true,
    valueexist: true,
  });

  const getGameSettingDB = async () => {
    const data: GameSetting | null = await localforage.getItem(DB_GAMESETTING);
    if (data == null) return;
    setGameSetting(data);
    //setPlayerNumber(data.player);
    /*console.log("データをゲットしたなり");
    console.log("オブジェクトなり:", data);
    console.log(`プレイヤー数は${data.player}人なり`);
    */
  };

  useLayoutEffect(() => {
    //getGameSettingDB();
    //console.log(location.state);
    let numList: number[] = [];
    for (let i: number = 0; i < playerNumber; i++) {
      numList.push(numList[i]);
    }
    setInputArray(numList);
  }, []);

  useEffect(() => {
    getGameSettingDB();
  }, []);

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

  const checkValueExist = (inputValue: InputPlayerName): boolean => {
    const values = Object.values(inputValue);
    if (values.length < playerNumber) {
      return false;
    } else if (values.includes("")) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    try {
      const dupStatus: boolean = checkDuplicate(inputValue);
      const overStatus: boolean = checkCountOver(inputValue);
      const existStatus: boolean = checkValueExist(inputValue);
      if (dupStatus === false || overStatus === false || existStatus == false) {
        setInputStatus({
          duplicate: dupStatus,
          countover: overStatus,
          valueexist: existStatus,
        });
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
      <header className="text-center pb-10">
        <h1 className="font-bold text-white">{TITLE}</h1>
      </header>
      <div className="flex flex-col justify-center items-center">
        {/*(() => location.state > 0 && createNameInputBox())()*/}
        {inputArray.map((num, index) => {
          //console.log(index);
          return (
            <input
              type="text"
              key={index}
              name={`player${index + 1}`}
              placeholder={`player${index + 1}`}
              value={
                inputValue[`player${index + 1}`] == undefined ? "" : inputValue[`player${index + 1}`]
              }
              autoComplete="off"
              className="text-white text-sm sm:text-md w-3/4 outline-0 bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 rounded-lg my-3 p-2.5"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
            />
          );
        })}
        {inputStatus.duplicate === false ? (
          <span className="border-2 rounded-lg p-2 bg-red-500 mt-3 mb-3">
            プレイヤー名が重複しています
          </span>
        ) : (
          <span></span>
        )}
        {inputStatus.countover === false ? (
          <span className="border-2 rounded-lg p-2 bg-red-500 mt-3 mb-3">
            プレイヤー名は10文字以内で入力してください
          </span>
        ) : (
          <span></span>
        )}
        {inputStatus.valueexist === false ? (
          <span className="border-2 rounded-lg p-2 bg-red-500 mt-3 mb-3">
            プレイヤー名は必須！
          </span>
        ) : (
          <span></span>
        )}
        <button
          onClick={() => handleSubmit()}
          className="mt-5 p-3 w-full mt-10 rounded-lg text-white border-2 border-solid border-blue-700"
        >
          ゲーム開始！
        </button>
      </div>
    </>
  );
}
