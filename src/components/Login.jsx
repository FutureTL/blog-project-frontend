import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import Input from "./Input";
import Logo from "./Logo";
import axios from "axios";
import Button from "./Button";


const Login = () => {

    console.log(`login entered`);
    
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm();
    const {login} = useAuth();


    const loginUser = (data)=>{

        setError("");
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`,

            {
                email: data.email,
                password: data.password,
                username : data.username,
            },
            {
                withCredentials: true,
            }
        ).then((response)=> {
            if(response){
                //user was logged in succesfully.
                //update the context then and redirect to home page.
                console.log("Login:: loginUser :: response ::", response.data.data);
                
                login(response.data.data.user);
                navigate('/');
            }
        })
        .catch((error)=>{
            console.log(`login:: loginUser :: error ${error}`);
        })

    }



    return(
        
         <div className="flex items-center justify-center min-h-screen bg-pink-50">
        <div className="flex flex-col w-full max-w-md bg-white rounded-xl shadow-lg p-10 border-2 border-pink-500">
           
            <div className="flex justify-center mb-6">
            <Logo width="100px" />
        </div>
           
        <h2 className="text-center text-2xl font-bold mb-2">
          Sign in to your account
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-pink-500 font-semibold hover:text-pink-400"
          >
            Sign up
          </Link>
        </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(loginUser)} className="mt-8">
                <div className="space-y-5">
                     <div className="flex flex-col text-left">
                    <Input 

                        label= "Email "
                        placeholder = "Enter your Email"
                        type= "Email"
                        {... register("email", {

                            required: false,
                            validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.
                            test(value) || "Email address must be a valid address",
                        }
                        })}
                    
                    />
                    </div>

                     <div className="flex flex-col text-left">
                    <Input 
                        label= "Username "
                        placeholder = "Enter your username"
                        {... register("username", {

                            required: false,
                        })}
                    />
                    </div>

                    <div className="flex flex-col text-left">
                    <Input
                        label= "password"
                        placeholder= "Enter your password"
                        type= "password"
                        {... register("password", {

                            required: true,
                            minLength:8,
                            maxLength:15
                        })}
                    />
                    </div>

                    <Button type="submit">login in</Button>
                    
                </div>
            </form>

            </div>
            </div>
            

    )

}

export default Login;