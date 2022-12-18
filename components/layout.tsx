import React from "react";

type Props = {
    children?: React.ReactNode;
}
export default function Layout({children}: Props): React.ReactElement {
    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center">
            <main>{children}</main>
        </div>
    );
}
