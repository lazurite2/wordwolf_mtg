import React from "react";

type Props = {
    children?: React.ReactNode;
}
export default function Layout({children}: Props): React.ReactElement {
    return (
        <div className="h-screen w-screen absolute inset-0 flex justify-center items-center bg-zinc-50">
            <main>{children}</main>
        </div>
    );
}
