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
      navigate("/gameresult", { state: gameInfo });
    }
  }, [time, timerStop]);

  return (
    <>
      <header className="text-center pt-32 pb-10">
        <h1 className="font-bold">トーク</h1>
      </header>
      <div className="">
        <ul className="text-center">
          <li>
            <span className="text-6xl font-thin">{`${
              createTimer(time).minStr
            } : ${createTimer(time).secStr}`}</span>
          </li>
          <div className="flex justify-center pt-5 pb-5 gap-2">
            <li>
              <button
                className="p-2 bg-teal-500/60 rounded-md"
                onClick={() => time > 60 && setTime(time - 60)}
              >
                - 1:00
              </button>
            </li>
            <li>
              <button
                className="p-2 bg-teal-500/60 rounded-md"
                onClick={() => setTime(time + 60)}
              >
                + 1:00
              </button>
            </li>
          </div>
          <div className="flex justify-center pt-5 pb-5 gap-2">
            <li>
              <button
                className="p-2 bg-teal-500/60 rounded-md"
                onClick={() =>
                  timerStop === true ? setTimerStop(false) : setTimerStop(true)
                }
              >
                {timerStop === true ? "再開" : "一時停止"}
              </button>
            </li>
            <li>
              {timerStop === true ? (
                <button
                  onClick={() => navigate("/gameresult", { state: gameInfo })}
                  className="p-2 bg-teal-500/60 rounded-md"
                >
                  終了
                </button>
              ) : (
                <span></span>
              )}
            </li>
          </div>
          {/*<button
          className="p-2 bg-teal-500/60 rounded-md"
          onClick={() => time > 0 && setTime((prev) => prev - prev)}
        >
          結果を見る
        </button>
          */}
        </ul>
      </div>
    </>
  );
}
