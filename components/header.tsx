export default function Header() {
    const gametitle: string = "ワードウルフ × MTG"
    return (
        <>
            <header className="text-center pt-32 pb-32">
                <h1 className="font-bold">{gametitle}</h1>
            </header>
        </>
    );
}