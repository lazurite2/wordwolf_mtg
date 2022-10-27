import { BrowserRouter, Routes, Route } from "react-router-dom";   
import Layout from "../components/layout";
import NotFound from "./pages/404";
import GameSetting from "./pages/gamesetting";
import Home from "./pages/home";
import PlayerNameSetting from "./pages/PlayerNameSetting";
import ThemeCheck from "./pages/themecheck";

export function App() {
 return (
    <>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/gamesetting" element={<GameSetting/>} />
                    <Route path="/playernamesetting" element={<PlayerNameSetting />} />
                    <Route path="/themecheck" element={<ThemeCheck />} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </>
 );
}