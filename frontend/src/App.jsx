import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Categoryproducts from "./pages/categoryProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/categoryproducts/:id" element={<Categoryproducts />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
