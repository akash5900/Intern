import { useContext } from "react";
import Authcontext from "./authContext";

export default function useAuth() {

    return useContext(Authcontext);

}