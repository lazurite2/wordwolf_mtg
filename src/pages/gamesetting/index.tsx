export default function GameSetting() {
    const gamesettingtitle: string = "ゲーム設定"
    return (
        <>
            <header className="text-center pt-32 pb-32">
                <h1 className="font-mplus font-bold">{gamesettingtitle}</h1>
            </header>        
            <div className="flex flex-col justify-center items-center gap-2">
                <form>
                    <select></select>
                </form>
            </div>
        </>
    );
}