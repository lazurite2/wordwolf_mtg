import React from "react";

type Props = {
    children?: React.ReactNode;
}
export default function Layout({children}: Props): React.ReactElement {
    return (
        <div className="mx-auto w-screen h-screen">
            <main>{children}</main>
        </div>
    );
}