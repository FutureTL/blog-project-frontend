import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

//user clicks on logout -> update the context ->redirect the user to home page.
//---------------IMPT PT----------------------
//Logout btn will be made visible to the user only if he is logged in.

const LogoutBtn = () => {
    
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const logoutUser = () => {
        logout();
        console.log(`logout clicked :: user detail now :: ${user}`)
        navigate('/');
    }

    
    return user ?
        <button
            onClick={logoutUser}
            className="text-pink-400 hover:text-pink-500 transition cursor-pointer"
        >
            Logout
        </button>
    
    : null

}

export default LogoutBtn;