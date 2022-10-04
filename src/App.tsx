import React from "react";
import Header from "../components/header";
import Layout from "../components/layout";
import Top from "../components/top";

export function App() {
 return (
    <React.StrictMode>
        <Layout>
            <Header />
            <Top />
        </Layout>
    </React.StrictMode>
 );
}