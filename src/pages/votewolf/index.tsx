import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

type PlayerDetail = {
    name: string;
    theme: string;
    role: string;
};

type GameInfos = {
    player: PlayerDetail[];
    timer: number;
};

export default function VoteWolf() {
    const location = useLocation();
    const navigate = useNavigate();
    const [gameInfo, setGameInfo] = useState<GameInfos>(location.state);

    return (
        <>
            <header className="text-center pb-10">
                <h1 className="font-bold">人狼はだれ？</h1>
            </header>
            <div className="flex flex-col justify-center items-center">
                <span className="text-2xl pb-10">誰が人狼か議論してください</span>
                <button
                    className="p-3 rounded-md bg-green-500"
                    onClick={() => navigate("/gameresult", { state: gameInfo })}
                >
                    結果を確認
                </button>
            </div>
        </>
    );
}
