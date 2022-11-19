import { BrowserRouter, Routes, Route } from "react-router-dom";   
import Layout from "../components/layout";
import NotFound from "./pages/404";
import GameSetting from "./pages/gamesetting";
import Home from "./pages/home";
import PlayerNameSetting from "./pages/playerNameSetting";
import ThemeCheck from "./pages/themecheck";
import TalkTimer from "./pages/talktimer";
import GameResult from "./pages/gameresult";

export default function App() {
 return (
    <>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={ <Home/> } />
                    <Route path="/gamesetting" element={ <GameSetting/> } />
                    <Route path="/playernamesetting" element={ <PlayerNameSetting /> } />
                    <Route path="/themecheck" element={ <ThemeCheck /> } />
                    <Route path="/talktimer" element={ <TalkTimer /> } />
                    <Route path="/gameresult" element={ <GameResult /> } />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </>
 );
}
