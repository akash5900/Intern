import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home";
import Addproducts from "./pages/addProducts";
import Updateproduct from "./pages/updateProducts";
import Addcategory from "./pages/addCategory";
import Updatecategory from "./pages/updateCategory";
import Categoryproducts from "./pages/categoryProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/categoryproducts/:id" element={<Categoryproducts />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
