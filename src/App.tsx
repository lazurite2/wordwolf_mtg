import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";   
import Header from "../components/header";
import Layout from "../components/layout";
import NotFound from "./pages/404";
import GameSetting from "./pages/gamesetting";
import Home from "./pages/home";

export function App() {
 return (
    <React.StrictMode>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/gamesetting" element={<GameSetting/>} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </React.StrictMode>
 );
}