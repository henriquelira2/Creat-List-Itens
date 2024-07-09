import { BrowserRouter, Route, Routes } from "react-router-dom";

import Teste from "../pages/Teste/index";
import Home from "../pages/Home/index";

export const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Teste" element={<Teste />} />
            </Routes>
        </BrowserRouter>
    );
};