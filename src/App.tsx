import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListaVideos from "./components/AppPrincipal/listaVideos";
import CrearVideo, { listaVideo } from "./components/CrearVideo/CrearVideo";
import PerfilVideo from "./components/PerfilVideo/PerfilVideo";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ListaVideos />} />
                    <Route path="/crearVideo" element={<CrearVideo />} />
                    <Route path="/perfilVideo/:id" element={<PerfilVideo />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
