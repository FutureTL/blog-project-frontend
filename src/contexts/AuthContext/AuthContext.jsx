import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

//how will this help us in knowing if the user is logged in or not. 
//it seems we are logging in the user, not checking if he is already logged in.
//will we access the user and see if it is null or not?? will null indicate that the user is not
//logged in??

export const AuthProvider = ({children})=>{

    console.log(`logging the children:: ${children.data}`);
    

    const [user, setUser] = useState(null);
  


    const login = (userData) =>{
        //here I will call the databse function for logging in the user.
            setUser(userData);
    }

    const logout = ()=>{
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{login, logout,user,setUser}}>
            {children}
        </AuthContext.Provider>
    )

};



export const useAuth = () => {

    return useContext(AuthContext);

}