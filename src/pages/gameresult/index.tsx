import localforage from "localforage";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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

    useEffect(() => {
        console.log(gameInfo.player);
    }, []);

    return (
        <>
            <header className="text-center pt-32 pb-10">
                <h1 className="font-bold">結果発表</h1>
            </header>
            <div className="text-center">
            <span className="text-3xl">人狼は以下の方でした！</span>
            <ul className="list-none pt-10">
                {gameInfo.player
                    .filter((p) => p.role === "wolf")
                    .map((p) => (
                        <li key={p.name} className="text-2xl">{p.name}</li>
                    ))}
            </ul>
            </div>
        </>
    );
}
