import { BrowserRouter, Routes, Route } from "react-router-dom"
import Adminlayout from "./components/adminlayout";

import Addproducts from "./pages/products/addproduct";
import Allproducts from "./pages/products/allproducts";
import Updateproduct from "./pages/products/editproduct";

import Addcategory from "./pages/category/addcategory";
import Allcategories from "./pages/category/allcategories";
import Updatecategory from "./pages/category/editcategory";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Adminlayout />}>
                    <Route path="/addproduct" element={<Addproducts />} />
                    <Route path="/allproducts" element={<Allproducts />} />
                    <Route path="/updateproduct/:id" element={<Updateproduct />} />

                    <Route path="/addcategory" element={<Addcategory />} />
                    <Route path="/allcategories" element={<Allcategories />} />
                    <Route path="/updatecategory/:id" element={<Updatecategory />} />
                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App
