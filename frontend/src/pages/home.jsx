import Header from "../components/header";
import Category from "../components/categorys";
import Banner from "../components/banner";
import Products from "../components/products";
import Footer from "../components/footer";

function Home() {
  return (
    <div>
      <Header />
      <Category />
      <Banner/>
      <Products />
      <Footer />
    </div>
  );
}
export default Home;
