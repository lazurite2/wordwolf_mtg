import {Link} from 'react-router-dom';

export default function Home() {
    const start_button: string = "はじめる";
    const desc_button: string = "遊び方";
    const gametitle: string = "ワードウルフ × MTG"
    return (
        <>
            <header className="text-center pt-32 pb-32">
                <h1 className="font-mplus font-bold">{gametitle}</h1>
            </header>
            <div className="flex flex-col justify-center items-center gap-10">
                <Link to="/gamesetting" className="border-2 p-2 w-2/3 lg:w-1/3 border-blue-300 rounded-md text-center">
                    {start_button}
                </Link>
                <Link to="/gamesetting" className="border-2 p-2 w-2/3 lg:w-1/3 border-blue-300 rounded-md text-center">
                    {desc_button}
                </Link>
            </div>
        </>
    );
}