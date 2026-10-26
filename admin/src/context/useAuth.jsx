import AuthContext from "./authContext";
import { useContext } from "react";

export default function useAuth() {
    return useContext(AuthContext);
}