import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Categoryproducts from "./pages/categoryProducts";
import Signup from "./pages/signUp";
import Login from "./pages/login";
import Profile from "./pages/profile";
import ProductDetail from "./pages/productDetail";
import Cart from "./pages/cart";
import Order from "./pages/orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Order />} />

        <Route path="/categoryproducts/:id" element={<Categoryproducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
