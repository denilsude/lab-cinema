import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "../components/Nav";
import HomePages from "../pages/HomePages";
import FilmePages from "../pages/FilmePages";
import SalaPages from "../pages/SalaPages";
import SessaoPages from "../pages/SessaoPages";
import LanchePages from "../pages/LanchePages";

export default function AppRouters() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/filmes" element={<FilmePages />} />
        <Route path="/salas" element={<SalaPages />} />
        <Route path="/sessoes" element={<SessaoPages />} />
        <Route path="/lanches" element={<LanchePages />} />
      </Routes>
    </BrowserRouter>
  );
}