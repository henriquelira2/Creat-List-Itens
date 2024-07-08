import { BrowserRouter, Route, Routes } from "react-router-dom";

import TestePage from "../pages/Teste/index";

export const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TestePage />} />
            </Routes>
        </BrowserRouter>
    );
};