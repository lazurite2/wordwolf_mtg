import React from "react";

type Props = {
    children?: React.ReactNode;
}
export default function Layout({children}: Props): React.ReactElement {
    return (
        <div className="mx-auto w-[500px] my-2">
            <main>{children}</main>
        </div>
    );
}