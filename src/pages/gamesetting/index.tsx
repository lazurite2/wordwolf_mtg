import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import * as localforage from "localforage";
import { Link, useNavigate } from "react-router-dom";

type InputSetting = {
    player: number;
    wolves: number;
    civil: number;
    timer: number;
};

export default function GameSetting() {
    const initialSetting = {
        player: 3,
        wolves: 1,
        civil: 2,
        timer: 2,
    };
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
    const navigate = useNavigate();

    const [property, setProperty] = useState<InputSetting>(initialSetting);

    const calcPlayer = (value: string) => {
        if (value === INC) {
            if (property.player !== MAXPLAYER) {
                setProperty((prev) => ({ ...prev, player: prev.player + 1 }));
            }
        } else if (value === DEC) {
            if (property.player !== MINPLAYER) {
                setProperty((prev) => ({ ...prev, player: prev.player - 1 }));
            }
        }
    };

    const calcWolf = (value: string) => {
        if (value === INC) {
            if (property.wolves !== MAXWOLF) {
                setProperty((prev) => ({ ...prev, wolves: prev.wolves + 1 }));
            }
        } else if (value === DEC) {
            if (property.wolves !== MINWOLF) {
                setProperty((prev) => ({ ...prev, wolves: prev.wolves - 1 }));
            }
        }
    };

    const calcTimer = (value: string) => {
        if (value === INC) {
            if (property.timer !== MAXTIMER) {
                setProperty((prev) => ({ ...prev, timer: prev.timer + 1 }));
            }
        } else if (value === DEC) {
            if (property.timer !== MINTIMER) {
                setProperty((prev) => ({ ...property, timer: prev.timer - 1 }));
            }
        }
    };

    // 人狼 or プレイヤー数変動で発火する市民数計算機
    useEffect(() => {
        const calcCivil: number = property.player - property.wolves;
        setProperty({ ...property, civil: calcCivil });
    }, [property.wolves, property.player]);

    /*useEffect(() => {
        console.log("プレイヤー:", property.player);
        console.log("市民:", property.civil);
        console.log("人狼:", property.wolves);
    }, [property.civil]);

    useEffect(() => {
        console.log("timer:", property.timer);
        }, [property.timer]);*/

    /*const watchDB = async () => {
        const pValue = await localforage.getItem(DB_GAMESETTING);
        if (pValue) {
            console.log(pValue);
        }
        };*/

    /*useEffect(() => {
        watchDB();
        }, []);*/

    const handleSubmit = async () => {
        try {
            localforage.removeItem(DB_GAMESETTING);
            await localforage.setItem(DB_GAMESETTING, property);
            navigate("/playernamesetting");
            //localforage.clear()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <header className="text-center pb-10">
                <h1 className="font-bold select-none">{TITLE}</h1>
            </header>
            <div className="flex flex-col justify-center items-center pb-5">
                <span className="text-xl pb-3 select-none">プレイヤー数</span>
                <div className="flex items-center pb-2">
                    <button
                        className="h-12 w-12 text-white bg-blue-500 rounded-xl"
                        onClick={() => calcPlayer(DEC)}
                    >
                        <MinusIcon />
                    </button>
                    <span className="text-3xl px-5 select-none">
                        {property.player}
                    </span>
                    <button
                        className="h-12 w-12 text-white bg-red-500 rounded-xl"
                        onClick={() => calcPlayer(INC)}
                    >
                        <PlusIcon />
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center pb-5">
                <span className="text-xl pb-3 select-none">人狼の数</span>
                <div className="flex items-center pb-2">
                    <button
                        className="h-12 w-12 text-white bg-blue-500 rounded-xl"
                        onClick={() => calcWolf(DEC)}
                    >
                        <MinusIcon />
                    </button>
                    <span className="text-3xl px-5 select-none">
                        {property.wolves}
                    </span>
                    <button
                        className="h-12 w-12 text-white bg-red-500 rounded-xl"
                        onClick={() => calcWolf(INC)}
                    >
                        <PlusIcon />
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center pb-5">
                <span className="text-xl pb-3 select-none">タイマー (分)</span>
                <div className="flex items-center pb-2">
                    <button
                        className="h-12 w-12 text-white bg-blue-500 rounded-xl"
                        onClick={() => calcTimer(DEC)}
                    >
                        <MinusIcon />
                    </button>
                    <span className="text-3xl px-5 select-none">
                        {property.timer}
                    </span>
                    <button
                        className="h-12 w-12 text-white bg-red-500 rounded-xl"
                        onClick={() => calcTimer(INC)}
                    >
                        <PlusIcon />
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center pt-7">
                    <button
                        onClick={ async () => await handleSubmit() }
                        className="p-3 w-full rounded-md bg-green-500 select-none"
                    >
                        プレイヤー名設定へ
                    </button>
            </div>
        </>
    );
}
