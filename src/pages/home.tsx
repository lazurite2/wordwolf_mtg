import { Link } from "react-router-dom";

export default function Home() {
    const start_button: string = "はじめる";
    const tutorial_button: string = "遊び方";
    const gametitle: string = "ワードウルフ × MTG";

    return (
        <>
            <header className="text-center pt-32 pb-32">
                <h1 className="font-bold">{gametitle}</h1>
            </header>
            <div className="flex flex-col justify-center items-center gap-10">
                <Link
                    to="/gamesetting"
                    className="p-2 w-2/3 lg:w-1/3 bg-green-500 rounded-md text-center"
                >
                    {start_button}
                </Link>
            </div>
        </>
    );
}
