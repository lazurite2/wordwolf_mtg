import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TalkTimer() {
  const navigate = useNavigate();
  const allseconds: number = Math.floor(4 * 60);
  const [time, setTime] = useState(allseconds);

  const createTimer = (seconds: number) => {
    // 参考[https://word-wolf.net]
    const minutes: number = Math.floor(seconds / 60);
    const sec: number = seconds % 60;
    const minStr: string =
      minutes < 10 ? "0" + String(minutes) : String(minutes);
    const secStr: string = sec < 10 ? "0" + String(sec) : String(sec);

    return { minStr, secStr };
  };
  useEffect(() => {
    if (time > 0) {
      const intervalId = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (time <= 0) {
      navigate("/gameresult");
    }
  }, [time]);

  return (
    <>
      <header className="text-center pt-32 pb-10">
        <h1 className="font-bold">トーク</h1>
      </header>
      <div className="flex flex-col items-center">
        <span className="text-6xl font-thin">{`${createTimer(time).minStr} : ${
          createTimer(time).secStr
        }`}</span>
        <div className="flex pt-10 pb-10">
          <button
            className="p-2 mx-5 bg-teal-500/60 rounded-md"
            onClick={() => time > 60 && setTime(time - 60)}
          >
            1分減らす
          </button>
          <button
            className="p-2 mx-5 bg-teal-500/60 rounded-md"
            onClick={() => setTime(time + 60)}
          >
            1分増やす
          </button>
        </div>
        <button
          className="p-2 bg-teal-500/60 rounded-md"
          onClick={() => time > 0 && setTime(time - time)}
        >
          結果を見る
        </button>
      </div>
    </>
  );
}
