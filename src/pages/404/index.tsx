import { Link } from "react-router-dom";

export default function NotFound() {
    const notfoundtitle:string = "404";
    return (
        <>
            <header className="text-center pt-32 pb-32">
                <h1 className="font-mplus font-bold">{notfoundtitle}</h1>
            </header>
            <div className="flex justify-center items-center gap-2">
                <h2 className="font-semibold font-mplus">Not Found!</h2>
                <Link to="/" className="text-indigo-500">
                    <h2 className="font-semibold font-mplus">Back!</h2>
                </Link>
            </div>
        </>
    );
}