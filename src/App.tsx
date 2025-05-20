import './index.css';

import {BrowserRouter, Routes, Route} from "react-router-dom";

import MainPage from './pages/main page/MainPage.tsx';
import CoinsListPage from "./pages/coins list page/CoinsListPage.tsx";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<MainPage/>}/>
                    <Route path="/coins list" element={<CoinsListPage />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
