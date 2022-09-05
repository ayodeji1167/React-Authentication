import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export default function useAuth(){
    return useContext(AuthContext)
}

// This  eliminates the need for importing usecontext and authcontext