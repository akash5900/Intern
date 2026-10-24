import { useContext } from "react";
import CartContext from "./cartContext";

export default function useCart() {
  return useContext(CartContext);
}
