import localforage from "localforage";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { GameSettingHundler } from "../../../utils/main";

type PlayerDetails = {
    name: string;
    theme: string;
    role: string;
};

type GameInfo = {
    player: PlayerDetails[];
    timer: number;
};

export default function GameResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const [gameInfo, setGameInfo] = useState<GameInfo>(location.state);

    /*useEffect(() => {
        console.log(gameInfo.player);
        }, []);*/

    const continueGame = async () => {
        await GameSettingHundler();
        navigate("/themecheck");
    };

    const endGame = async () => {
        await localforage.clear();
        navigate("/");
    };

    return (
        <>
            <header className="text-center pt-32 pb-10">
                <h1 className="font-bold">結果発表</h1>
            </header>
            <div className="text-center">
                <span className="text-3xl">人狼は以下の方でした</span>
                <ul className="list-none pt-10 pb-10">
                    {gameInfo.player
                        .filter((p) => p.role === "wolf")
                        .map((p) => (
                            <li key={p.name} className="text-2xl text-red-500">
                                {`${p.name} : ${p.theme}`}
                            </li>
                        ))}
                </ul>
                <div className="flex flex-col items-center gap-5">
                    <button
                        className="p-2 rounded-md bg-blue-500"
                        onClick={() => continueGame()}
                    >
                        もう一度
                    </button>
                    <button className="p-2 rounded-md bg-green-500" onClick={() => endGame()}>
                        終了する
                    </button>
                </div>
            </div>
        </>
    );
}
