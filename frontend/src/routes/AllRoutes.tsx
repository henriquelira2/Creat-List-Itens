import { BrowserRouter, Route, Routes } from "react-router-dom";

import Teste from "../pages/Teste/index";
import Home from "../pages/Home/index";
import CreateList from "../pages/Create-List/index";
import SaveList from "../pages/Save-List/index";

export const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Teste" element={<Teste />} />
                <Route path="/Nova-Lista" element={<CreateList />} />
                <Route path="/Listas-Salvas" element={<SaveList />} />
            </Routes>
        </BrowserRouter>
    );
};