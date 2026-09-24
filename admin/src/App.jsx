import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Adminlayout from "./components/adminlayout";
import AdminProtectedRoute from "./adminProtectedRoute";
import Login from "./pages/login";

import Allusers from "./pages/users/allusers";

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
                <Route
                    path="/"
                    element={<Navigate to="/admin/login" replace />}
                />

                <Route path="/admin/login" element={<Login />} />

                <Route path="/admin" element={<AdminProtectedRoute> <Adminlayout /></AdminProtectedRoute>}>

                    <Route path="allusers" element={<Allusers />} />X

                    <Route path="addproduct" element={<Addproducts />} />
                    <Route path="allproducts" element={<Allproducts />} />
                    <Route path="updateproduct/:id" element={<Updateproduct />} />

                    <Route path="addcategory" element={<Addcategory />} />
                    <Route path="allcategories" element={<Allcategories />} />
                    <Route path="updatecategory/:id" element={<Updatecategory />} />
                </Route>



            </Routes>
        </BrowserRouter>
    )
}

export default App
