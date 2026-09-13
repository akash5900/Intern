import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Categoryproducts from "./pages/categoryProducts";
import Signup from "./pages/signUp";
import Login from "./pages/login";
import Profile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/categoryproducts/:id" element={<Categoryproducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
