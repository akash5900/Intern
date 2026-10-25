import Products from "../components/products";
import Footer from "../components/footer";
import ProductsFilters from "../components/productsFilters";

export default function Product() {
  return (
    <div className="pt-4">
      <ProductsFilters />
      <Products />
      <Footer />
    </div>
  );
}
