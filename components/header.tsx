export default function Header() {
    const gametitle: string = "ワードウルフ × MTG"
    return (
        <>
            <header className="text-center pt-32 pb-32">
                <h1 className="font-bold font-delta">{gametitle}</h1>
            </header>
        </>
    );
}