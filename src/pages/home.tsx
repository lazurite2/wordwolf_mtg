import { Link } from "react-router-dom";
import Footer from "../../components/footer";

export default function Home() {
    const start_button: string = "はじめる";
    const tutorial_button: string = "遊び方";
    const gametitle: string = "ワードウルフ × MTG";

    return (
        <>
            <header className="text-center pb-10">
                <h1 className="text-white font-bold">{gametitle}</h1>
            </header>
            <div className="flex flex-col justify-center items-center gap-10">
                <Link
                    to="/gamesetting"
                    className="p-3 w-3/4 lg:w-full text-white border-2 border-solid border-blue-700 rounded-md text-center"
                >
                    {start_button}
                </Link>
                <Link
                    to="/tutorial"
                    className="p-3 w-3/4 lg:w-full text-white border-2 border-solid border-blue-700 rounded-md text-center"
                >
                    {tutorial_button}
                </Link>
            </div>
            <footer className="text-center pt-10">
                <Footer />
            </footer>
        </>
    );
}
