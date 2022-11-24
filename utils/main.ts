import localforage from "localforage";
import React, { useState, useEffect } from "react";
import { themeMaster } from "./themeMaster";


type PlayerList = {
  name: string;
  theme: string;
  role: string;
};

type GameSettings = {
  player: PlayerList[];
  timer: number;
};

type PreGameSetting = {
  player: number;
  wolves: number;
  civil: number;
  timer: number;
};

type InputPlayerName = {
  [name: string]: string;
};

export async function GameSettingHundler() {
  const DB_WORDS: string = "playerDetails";

  // ゲーム設定取得
  const preSettingList: PreGameSetting | null = await localforage.getItem(
    "gameSetting"
  );

  // プレイヤー名取得
  const playersNameList: InputPlayerName | null = await localforage.getItem(
    "playerNameList"
  );

  if (preSettingList == null || playersNameList == null) return;
  const timerNum: number = preSettingList.timer;
  const playersNum: number = Object.values(playersNameList).length;
  const playersName: string[] = Object.values(playersNameList);
  const themeWords: string[] = setTheme(themeMaster);
  const wolvesIndex: number[] = selectWolves(
    preSettingList.wolves,
    preSettingList.player
  );

  /*
  console.log("人狼の要素番号: ", wolvesIndex);
  console.log("お題: ", themeWords);
  console.log(`プレイヤーは ${playersNum}名`);
  console.log(`制限時間は ${timerNum}分`);
  */

  const playerList: PlayerList[] = setPlayer(
    playersNum,
    playersName,
    themeWords,
    wolvesIndex
  );

  const gameSetting: GameSettings = { player: playerList, timer: timerNum };

  localforage.removeItem(DB_WORDS);
  await localforage.setItem(DB_WORDS, gameSetting);
}

// プレイヤーの詳細をセット
export function setPlayer(
  player: number,
  names: string[],
  themes: string[],
  wolves: number[]
): Array<PlayerList> {
  let playerArray: PlayerList[] = [];
  for (let i: number = 0; i < player; i++) {
    if (wolves.includes(i)) {
      playerArray[i] = { name: names[i], theme: themes[0], role: "wolf" };
    } else {
      playerArray[i] = { name: names[i], theme: themes[1], role: "civil" };
    }
  }
  return playerArray;
}

// お題をセット
export function setTheme(themeMaster: string[][]): string[] {
  const outerRandomIndex: number = Math.floor(
    Math.random() * themeMaster.length
  );
  const themeArray: string[] = themeMaster[outerRandomIndex];
  let wordArray: string[] = [];

  for (let i: number = 0; i < 2; i++) {
    do {
      wordArray[i] = themeArray[Math.floor(Math.random() * themeArray.length)];
    } while (i !== 0 && wordArray[0] === wordArray[1]);
  }

  return wordArray;
}

// 人狼を選定
export function selectWolves(wolves: number, player: number): number[] {
  let wolvesArray: number[] = [];

  for (let i: number = 0; i < wolves; i++) {
    do {
      wolvesArray[i] = Math.floor(Math.random() * player);
    } while (i !== 0 && wolvesArray[i - 1] === wolvesArray[i]);
    /* console.log(
      "狼" + (i + 1) + "人目は" + wolvesArray[i] + "番のプレイヤーなり"
    );*/
  }
  // プレイヤーの何番目が人狼かを返却
  return wolvesArray;
}
