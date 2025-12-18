import './bootstrap';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFound from "./pages/NotFound";
import PrivateRoute from './components/Routes/PrivateRoute';

function App(){

    <BrowserRouter>
    
        <Routes>
            
            /* Rutas públicas */
            <Route path='/' element={<LandingPage />}/>
            <Route path='/login' element={<LoginPage />}/>

            /* Rutas protegidas para usuario */
            <Route path="/dashboard" element={
                <PrivateRoute role="user"><UserDashboardPage /></PrivateRoute>
            }
            />

            /* Rutas protegidas para administrador */
            <Route path="/admin" element={
                <PrivateRoute role="admin"><AdminDashboardPage /></PrivateRoute>
            }
            />

            /* Ruta páginas no encontradas */
            <Route path='*' element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
