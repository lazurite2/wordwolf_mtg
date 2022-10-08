import {
    PlusIcon,
    MinusIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type inputSetting = {
    playerNum : number;
    wolvesNum : number;
    civilNum : number;
    timerNum : number;
}

export default function GameSetting() {
    const MINPLAYER: number = 3;
    const MAXPLAYER: number = 6;
    const MINWOLF: number = 1;
    const MAXWOLF: number = 2;
    const MINTIMER: number = 2;
    const MAXTIMER: number = 4;

    const initialSetting = {
        playerNum: 3,
        wolvesNum: 1,
        civilNum: 2,
        timerNum: 2
    }
    const gamesettingtitle: string = "ゲーム設定";
    const [property, setProperty] = useState<inputSetting>(initialSetting);
    const decrementPlayer = () => {
        if (property.playerNum !== MINPLAYER) {
            setProperty({ ...property, playerNum: property.playerNum - 1 });
        }
    }
    const incrementPlayer = () => {
        if (property.playerNum !== MAXPLAYER) {
            setProperty({ ...property, playerNum: property.playerNum + 1 });
        }
    }
    const decrementWolf = () => {
        if (property.wolvesNum !== MINWOLF) {
            setProperty({ ...property, wolvesNum: property.wolvesNum - 1 });
        }
    }
    const incrementWolf = () => {
        if (property.wolvesNum !== MAXWOLF) {
            setProperty({ ...property, wolvesNum: property.wolvesNum + 1 });
        }
    }
    const decrementTimer = () => {
        if (property.timerNum !== MINTIMER) {
            setProperty({ ...property, timerNum: property.timerNum - 1 });
        }
    }
    const incrementTimer = () => {
        if (property.timerNum !== MAXTIMER) {
            setProperty({ ...property, timerNum: property.timerNum + 1 });
        }
    }

    useEffect(() => {

    },[])
    return (
        <>
            <header className="text-center pt-10 pb-10">
                <h1 className="font-mplus font-bold">{gamesettingtitle}</h1>
            </header>        
            <div className="">
                <form aria-label="game_setting_form">
                    <div className="flex flex-col justify-center items-center pb-8">
                        <span className="text-xl py-3 ">プレイヤー数</span>
                        <div className="flex items-center">
                            <MinusIcon className="h-10 w-10 text-blue-500 border-2 border-blue-300 rounded-md " onClick={() => decrementPlayer() } />
                            <span className="text-2xl px-5">{property.playerNum}</span>
                            <PlusIcon className="h-10 w-10 text-red-500 border-2 rounded-md border-red-300" onClick={() => incrementPlayer() } />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center pb-8">
                        <span className="text-xl py-3 ">人狼の数</span>
                        <div className="flex">
                            <MinusIcon className="h-10 w-10 text-blue-500 border-2 border-blue-300 rounded-md" onClick={() => decrementWolf() } />
                            <span className="text-2xl px-5">{property.wolvesNum}</span>
                            <PlusIcon className="h-10 w-10 text-red-500 border-2 rounded-md border-red-300" onClick={() => incrementWolf() } />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center pb-8"> 
                        <span className="text-xl py-3 ">タイマー (分)</span>
                        <div className="flex">
                            <MinusIcon className="h-10 w-10 text-blue-500 border-2 border-blue-300 rounded-md" onClick={() => decrementTimer() } />
                            <span className="text-2xl px-5">{property.timerNum}</span>
                            <PlusIcon className="h-10 w-10 text-red-500 border-2 border-red-300 rounded-md" onClick={() => incrementTimer() } />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center pt-7">
                        <button className="border-2 p-2 rounded-md  border-blue-300">プレイヤー名設定へ</button>
                    </div>
                </form>
            </div>
        </>
    );
}