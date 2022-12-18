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
                <h1 className="text-white font-bold">人狼をあてろ！</h1>
            </header>
            <div className="flex flex-col items-center justify-center text-center">
                <p className="text-2xl text-white pb-10">人狼だと思う人に、せーので投票をしてください</p>
                <button
                    className="p-3 text-white rounded-lg border-2 border-solid border-blue-700"
                    onClick={() => navigate("/gameresult", { state: gameInfo })}
                >
                    結果を確認
                </button>
            </div>
        </>
    );
}
