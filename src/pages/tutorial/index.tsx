import { Link } from "react-router-dom";

export default function Tutorial() {
    return (
        <>
            <header className="text-center">
                <h1 className="py-10 text-white">遊び方</h1>
            </header>
            <article className="prose sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl text-white mx-3 my-3">
                <div className="border-2 border-solid border-blue-700 rounded-md mx-1 my-2 py-2 px-2">
                    <h2 className="text-white">ワードウルフとは</h2>
                    <hr />
                    <p>
                        ワードウルフとは、与えられた「お題」について話し合い、
                        <strong className="text-white text-indigo-400">
                            皆と異なる話題を与えられた少数派の人狼を当てるゲーム
                        </strong>
                        です。
                    </p>

                    <p>
                        プレイヤーは
                        <strong className="text-white text-indigo-400">
                            「市民」「人狼」
                        </strong>
                        の2つの役職が与えられます。
                        <br />
                        しかし、この時点では自分がどの役職なのかは分かりません。
                    </p>
                    <p>
                        会話の中で自分が人狼だと思った場合、うまく話を合わせて市民を装いましょう。
                    </p>
                    <p>
                        お題について話し合った後、多数決で
                        <strong className="text-white text-indigo-400">
                            人狼だと思う人
                        </strong>
                        に投票をします。
                        <br />
                        その人が人狼の場合
                        <strong className="text-white text-indigo-400">
                            「市民」の勝利
                        </strong>
                        です。そうでない場合
                        <strong className="text-white text-indigo-400">
                            「人狼」の勝利
                        </strong>
                        です。
                    </p>
                    <p className="text-2xl text-red-700 font-semibold">
                        人狼のわるあがき
                    </p>
                    <p>
                        市民が勝利した場合、人狼に最後のチャンスが与えられます。
                    </p>
                    <p>
                        人狼は、市民側のお題を予想します。もし当たった場合は
                        <strong className="text-white text-red-700">
                            人狼の勝利
                        </strong>
                        となります。
                    </p>
                    <Link to={"/"} className="no-underline text-white hover:text-blue-700 text-xl font-bold">
                        TOPへ戻る
                    </Link>
                </div>
            </article>
        </>
    );
}
