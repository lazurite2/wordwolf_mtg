import GitHubImage from "../src/assets/github-mark-white.png";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Footer() {
    return (
        <>
            <div className="flex gap-3 justify-center items-center">
                <div className="flex items-center gap-1">
                <span className="text-white">作者</span>
                    <a href="https://github.com/lazurite2">
                        <img  src={GitHubImage} alt="github" width="30" height="30" />
                </a>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-white">お問い合わせ</span>
                    <a href="https://forms.gle/z1Kd44cFdyHpxhqY9">
                        <EnvelopeIcon className="w-7 h-7 text-white" />
                    </a>
                </div>
            </div>
        </>
    );
}
