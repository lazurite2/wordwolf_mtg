import localforage from "localforage";
import React, { useState, useEffect } from "react";

type GameSetting = {
  player: number;
  wolves: number;
  civil: number;
  timer: number;
}

type InputPlayerName = {
  [name: string]: string
}

export default function PlayerNameSetting() {
  const initialInput = {}
  const TITLE: string = "プレイヤー名設定";
  const DB_PLAYER: string = "playerNameList";
  const [gameSetting, setGameSetting] = useState<GameSetting>();
  const [playerNumber, setPlayerNumber] = useState(0);
  const [inputValue, setInputValue] = useState<InputPlayerName>({});

  const getGameSettingDB = async () => {
    const data: GameSetting | null = await localforage.getItem("gameSetting");
    if (data !== null && typeof data === 'object') {
      setGameSetting(data);
      setPlayerNumber(data.player);
      console.log("データをゲットしたなり");
      console.log("オブジェクトなり:", data);
      console.log(`プレイヤー数は${data.player}人なり`)
    }
  }
  const watchDB = async () => {
    const pValue = await localforage.getItem(DB_PLAYER);
    if (pValue) {
        console.log("プレイヤー名：",pValue);
    }
  }

  useEffect(() => {
      watchDB();
  },[]);
  useEffect(() => {
    getGameSettingDB();
   }, []);

  const createNameInputBox = () => {
    let box = [];
    let Nplayer: string = "";
    for (let i = 0; i < playerNumber; i++) {
      Nplayer = "player" + (i + 1);
      box.push(<input type="text" key={i} name={`player${i + 1}`} value={inputValue[Nplayer] === undefined ? '' : inputValue[Nplayer]} className="border-2 rounded-md my-3 p-2" placeholder={`プレイヤー${i + 1}`} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />);
    }
    return box;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const value = target.type === 'text' ? target.value : "";
      const name = target.name;
      setInputValue({...inputValue, [name]: value });

  }
  const checkInputValue = () => console.log(inputValue);
  const handleSubmit = async () => {
    try {
        localforage.removeItem(DB_PLAYER);
        await localforage.setItem(DB_PLAYER, inputValue);
        //localforage.clear()
    } catch (err) {
        console.log(err);
    }
}
  return (
    <>
      <header className="text-center pt-10 pb-10">
        <h1 className="font-bold">{TITLE}</h1>
      </header>

      <div className="flex flex-col justify-center items-center pb-8">
        {createNameInputBox()}
       </div>
       <div className="flex flex-col justify-center items-center pt-7">
            <button onClick={() => handleSubmit()} className="border-2 p-2 rounded-md  border-blue-300">ゲーム開始</button>
        </div>
    </>
  );
}
