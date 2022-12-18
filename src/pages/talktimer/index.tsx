import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import localforage from "localforage";

type PlayerDetails = {
  name: string;
  theme: string;
  role: string;
};

type GameInfo = {
  player: PlayerDetails[];
  timer: number;
};

export default function TalkTimer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [time, setTime] = useState<number>(
    Math.floor(location.state.timer * 60)
  );
  const [timerStop, setTimerStop] = useState<boolean>(false);
  const [gameInfo, setGameInfo] = useState<GameInfo>(location.state);

  const createTimer = (seconds: number) => {
    // 参考[https://word-wolf.net]
    const minutes: number = Math.floor(seconds / 60);
    const sec: number = seconds % 60;
    const minStr: string =
      minutes < 10 ? "0" + String(minutes) : String(minutes);
    const secStr: string = sec < 10 ? "0" + String(sec) : String(sec);

    return { minStr, secStr };
  };

  /*const getTimer = async () => {
    const r: GameInfo | null = await localforage.getItem("playerDetails");
    if (r == null) return undefined;
    setTime(Math.floor(r.timer * 60));
    console.log(time);
    };*/

  useEffect(() => {
    // console.log(location.state);
    if (timerStop) return;
    if (time > 0) {
      const intervalId = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (time <= 0) {
      navigate("/votewolf", { state: gameInfo });
    }
  }, [time, timerStop]);

  return (
    <div className="flex flex-col justify-center items-center">
      <header className="pb-10">
        <h1 className="text-white font-bold">トーク</h1>
      </header>
      <div className="flex flex-col justify-center items-center border-solid border-2 border-blue-600 p-10 rounded-lg">
        <span className="text-6xl text-white font-thin mb-5">{`${createTimer(time).minStr} : ${
          createTimer(time).secStr
        }`}</span>
        <div className="flex gap-1 mb-5">
          <button
            className="px-6 py-3 border-2 border-solid border-blue-600 text-white rounded-lg"
            onClick={() => time > 60 && setTime(time - 60)}
          >
            - 1:00
          </button>
          <button
            className="px-6 py-3 border-2 border-solid border-red-600 text-white rounded-lg"
            onClick={() => setTime(time + 60)}
          >
            + 1:00
          </button>
        </div>
        <div className="flex mb-5">
        <button
          className={`px-4 py-3 rounded-lg ${
            timerStop === true ? "mr-1 border-2 border-solid border-green-700 text-white" : "w-[196px] text-white border-2 border-solid border-gray-500"
          } `}
          onClick={() =>
            timerStop === true ? setTimerStop(false) : setTimerStop(true)
          }
        >
          {timerStop === true ? "スタート" : "一時停止"}
        </button>
        {timerStop === true ? (
          <button
            onClick={() => navigate("/votewolf", { state: gameInfo })}
            className="px-4 py-3 text-white border-2 border-solid rounded-lg"
          >
            中断する
          </button>
        ) : (
          <span></span>
        )}
        </div>
      </div>
    </div>
  );
}
