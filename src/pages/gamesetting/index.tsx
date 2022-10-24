import {
    PlusIcon,
    MinusIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import * as localforage from "localforage";
import { Link } from "react-router-dom";

type InputSetting = {
    player : number;
    wolves : number;
    civil : number;
    timer : number;
}

export default function GameSetting() {
    const initialSetting = {
        player: 3,
        wolves: 1,
        civil: 2,
        timer: 2
    }
    const MINPLAYER: number = 3;
    const MAXPLAYER: number = 6;
    const MINWOLF: number = 1;
    const MAXWOLF: number = 2;
    const MINTIMER: number = 2;
    const MAXTIMER: number = 4;
    const DB_GAMESETTING: string = "gameSetting";
    const INC: string = "inc";
    const DEC: string = "dec";
    const TITLE: string = "ゲーム設定";

    const [property, setProperty] = useState<InputSetting>(initialSetting);
    
    const flucPlayer = (value: string) => {
        if (value === INC) {
            if (property.player !== MAXPLAYER) {
                setProperty(prev => ({ ...prev, player: prev.player + 1 }));
            }
        } else if (value === DEC) {
            if (property.player !== MINPLAYER) {
                setProperty(prev => ({ ...prev, player: prev.player - 1 }));
            }
        }
    }

    const flucWolf = (value: string) => {
        if (value === INC) {
            if (property.wolves !== MAXWOLF) {
                setProperty(prev => ({ ...prev, wolves: prev.wolves + 1 }));
            }
        } else if (value === DEC) {
            if (property.wolves !== MINWOLF) {
                setProperty(prev => ({ ...prev, wolves: prev.wolves - 1 }));
            }
        }
    }
    
    const flucTimer = (value: string) => {
        if (value === INC) {
            if (property.timer !== MAXTIMER) {
                setProperty(prev => ({ ...prev, timer: prev.timer + 1 }));
            }
        } else if (value === DEC) {
            if (property.timer !== MINTIMER) {
                setProperty(prev => ({ ...property, timer: prev.timer - 1 }));
            }
        }
    }

    // 人狼 or プレイヤー数変動で発火する市民数計算機
    useEffect(() => {
        const civilcalc: number = property.player - property.wolves;
        setProperty({...property, civil: civilcalc});
    },[property.wolves,property.player]);

    useEffect(() => {
        console.log("プレイヤー:", property.player);
        console.log("市民:", property.civil);
        console.log("人狼:", property.wolves);
    },[property.civil]);

    useEffect(() => {
        console.log("timer:",property.timer);
    },[property.timer])
    
    const watchDB = async () => {
        const pValue = await localforage.getItem(DB_GAMESETTING);
        if (pValue) {
            console.log(pValue);
        }
    }

    useEffect(() => {
        watchDB();
    },[]);

    const handleSubmit = async () => {
        try {
            localforage.clear();
            await localforage.setItem(DB_GAMESETTING, property);
            //localforage.clear()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <header className="text-center pt-10 pb-10">
                <h1 className="font-bold font-mplus">{TITLE}</h1>
            </header>        
            <div className="">
                    <div className="flex flex-col justify-center items-center pb-8">
                        <span className="text-xl py-3 ">プレイヤー数</span>
                        <div className="flex items-center">
                            <MinusIcon className="h-10 w-10 text-blue-500 border-2 border-blue-300 rounded-md " onClick={() => flucPlayer(DEC) } />
                            <span className="text-2xl px-5">{property.player}</span>
                            <PlusIcon className="h-10 w-10 text-red-500 border-2 rounded-md border-red-300" onClick={() => flucPlayer(INC) } />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center pb-8">
                        <span className="text-xl py-3 ">人狼の数</span>
                        <div className="flex">
                            <MinusIcon className="h-10 w-10 text-blue-500 border-2 border-blue-300 rounded-md" onClick={() => flucWolf(DEC) } />
                            <span className="text-2xl px-5">{property.wolves}</span>
                            <PlusIcon className="h-10 w-10 text-red-500 border-2 rounded-md border-red-300" onClick={() => flucWolf(INC) } />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center pb-8"> 
                        <span className="text-xl py-3">タイマー (分)</span>
                        <div className="flex">
                            <MinusIcon className="h-10 w-10 text-blue-500 border-2 border-blue-300 rounded-md" onClick={() => flucTimer(DEC) } />
                            <span className="text-2xl px-5">{property.timer}</span>
                            <PlusIcon className="h-10 w-10 text-red-500 border-2 border-red-300 rounded-md" onClick={() => flucTimer(INC) } />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center pt-7">
                        <Link to={"/playernamesetting"}>
                            <button onClick={() => handleSubmit()} className="border-2 p-2 rounded-md  border-blue-300">プレイヤー名設定へ</button>
                        </Link>
                    </div>
            </div>
        </>
    );
}