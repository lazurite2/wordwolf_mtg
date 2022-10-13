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
  const [gameSetting, setGameSetting] = useState<GameSetting>();
  const [playerNumber, setPlayerNumber] = useState(0);
  const [inputValue, setInputValue] = useState<InputPlayerName>(initialInput);

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

  useEffect(() => {
    getGameSettingDB();
  }, []);

  const createNameInputBox = () => {
    let box = [];
    
    for (let i = 0; i < playerNumber; i++) {
      box.push(<input type="text" key={i} name={`player${i + 1}`} value={inputValue.name} className="border-2 rounded-md my-3 p-2" placeholder={`プレイヤー${i + 1}`} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />);
    }
    return box;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const value = target.type === 'text' ? target.value : "";
      const name = target.name;
      setInputValue({...inputValue, [name]: value });

  }
  
  return (
    <>
      <header className="text-center pt-10 pb-10">
        <h1 className="font-bold">{TITLE}</h1>
      </header>

      <div className="flex flex-col justify-center items-center pb-8">
        {createNameInputBox()}
      </div>
    </>
  );
}
