import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";

export default function Footer() {

    const navigate = useNavigate();
    return (
        <div className="bg-gray-800 text-yellow-50 px-25 py-6 ">
            <div className="flex gap-120">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-1">
                        <FaShoppingBag size={20} />
                        <h1 className="text-2xl">Shopsy</h1>
                    </div>

                    <p>Your one-stop destination for quality products at great prices. <br /> Shop smarter, live better.</p>

                    <div className="flex gap-1 items-center">
                        <h1>Connect with us - </h1>
                        <div className="flex flex-row gap-3 h-5">
                            <button className="cursor-pointer hover:pt-1 transition-all"><FaInstagram size={20} color="pink" /></button>
                            <button className="cursor-pointer hover:pt-1 transition-all"><FaFacebook size={20} color="blue" /></button>
                            <button className="cursor-pointer hover:pt-1 transition-all"><FaXTwitter size={20} color="skyblue" /></button>
                            <button className="cursor-pointer hover:pt-1 transition-all"><FaYoutube size={20} color="red" /></button>
                        </div>
                    </div>

                </div>

                <section className="flex gap-25">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-lg">Quick Links</h1>
                        <ul className="flex flex-col items-start gap-1 ml-4 text-sm">
                            <li><Link to={"/"} className="cursor-pointer hover:pl-2 transition-all" >Home</Link></li>
                            <li><Link to={"/orders"} className="cursor-pointer  hover:pl-2 transition-all">Orders</Link></li>
                            <li><Link to={"/cart"} className="cursor-pointer  hover:pl-2 transition-all">Cart</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-lg">My Account</h1>
                        <ul className="flex flex-col items-start gap-1 ml-4 text-sm">
                            <li><Link to={"/login"} className="cursor-pointer  hover:pl-2 transition-all">Login</Link></li>
                            <li><Link to={"/signup"} className="cursor-pointer  hover:pl-2 transition-all">Signup</Link></li>
                            <li><Link to={"/profile"} className="cursor-pointer  hover:pl-2 transition-all">Profile</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-lg">Legel</h1>
                        <ul className="flex flex-col items-start gap-1 ml-1 text-sm">
                            <li><Link className="cursor-pointer  hover:pl-2 transition-all">Privacy Policy</Link></li>
                            <li><Link className="cursor-pointer  hover:pl-2 transition-all">Terms & Conditions</Link></li>
                            <li><Link className="cursor-pointer  hover:pl-2 transition-all">Refund Policy</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-lg">Customer Service</h1>
                        <ul className="flex flex-col items-start gap-1 ml-4 text-sm">
                            <li><Link className="cursor-pointer  hover:pl-2 transition-all">Contact Us</Link></li>
                            <li><Link className="cursor-pointer  hover:pl-2 transition-all">FAQs</Link></li>
                            <li><Link className="cursor-pointer  hover:pl-2 transition-all">Shipping Policy</Link></li>
                            <li><Link className="cursor-pointer  hover:pl-2 transition-all">Returns & Refunds</Link></li>
                        </ul>
                    </div>
                </section>
            </div>
            <div className="border-t mt-4">
                <p>Developed By Akashdeep Singh</p>
            </div>
        </div>

    )
}