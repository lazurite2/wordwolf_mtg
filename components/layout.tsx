import React from "react";

type Props = {
    children?: React.ReactNode;
}
export default function Layout({children}: Props): React.ReactElement {
    return (
        <div className="mx-auto w-screen h-screen bg-orange-50">
            <main>{children}</main>
        </div>
    );
}