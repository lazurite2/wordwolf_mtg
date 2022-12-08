export default function Header() {
    const gametitle: string = "ワードウルフ × MTG"
    return (
        <>
            <header className="text-center">
                <h1 className="font-bold font-delta">{gametitle}</h1>
            </header>
        </>
    );
}
