import React from "react";
import Header from "../components/header";
import Layout from "../components/layout";

export function App() {
 return (
    <React.StrictMode>
        <Layout>
            <Header />
            <h1 className="font-bold">Hello from App.tsx</h1>
        </Layout>
    </React.StrictMode>
 );
}