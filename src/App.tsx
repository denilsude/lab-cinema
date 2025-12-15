import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Salas } from "./pages/Salas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>CineWeb</h1>} />
        <Route path="/salas" element={<Salas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
