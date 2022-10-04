export default function Home() {
    const first_button: string = "はじめる";
    const second_button: string = "トリセツ";
    return (
        <div className="flex flex-col justify-center items-center gap-10">
            <button className="border rounded-md p-2 w-2/3 lg:w-1/3">{first_button}</button>
            <button className="border rounded-md p-2 w-2/3 lg:w-1/3">{second_button}</button>
        </div>
    );
}