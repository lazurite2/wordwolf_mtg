import GitHubImage from "../src/assets/github-mark.png";

export default function Footer() {
    return (
        <>
            <div className="flex gap-3 justify-center items-center">
                <div className="flex items-center gap-1">
                <span>作者</span>
                    <a href="https://github.com/lazurite2/wordwolf_mtg">
                        <img src={GitHubImage}  alt="github" width="30" height="30" />
                </a>
                </div>
                <div className="flex items-center gap-1">
                    <a className="hover:text-blue-500" href="https://forms.gle/z1Kd44cFdyHpxhqY9">お問い合わせ</a>
                </div>
            </div>
        </>
    );
}
