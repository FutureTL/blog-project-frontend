import React, {useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { useAuth } from "../contexts/AuthContext/AuthContext";
import Logo from "./Logo";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
//signup- he/she wants to make an account. 
//we are making a post request from frontend to backend to add the user data in the database.


//how to update the context once user is logged in? still unclear.
//------------------IMPT PT----------------//
//in react project we have used a state for error. Do I require it here?
//What if I don't use it? Drawbacks?
const Signup = () => {

    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const {login} = useAuth();
//error I am getting - I was spreading the data received here when sending in the
//post request. error- not iterable.
    const createAccount = async(data) => {
          
          setError("");
          // because we are accepting an image that is why using formData is 
          //compulsory. sending as normal json data will not work.
          const formData = new FormData();
          formData.append("username", data.username)
          formData.append("fullname", data.name)
          formData.append("password", data.password)
          formData.append("confirmPassword", data.confirmPassword)
          formData.append("email", data.email)
          formData.append("description", data.description)
          formData.append("avatar", data.avatar[0])

          axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register`, 

                formData,
                {
                    withCredentials: true, 
                    headers: {
                    "Content-Type": "multipart/form-data", 
                },
                    
                })
                .then((response)=>{
                //is response is positive, user-registered -> we want to login the user automatically -> update the state using 
                //context and then redirect to home page.
                //qs- how to login? Maybe I will need the login details and we will update them.
                console.log("components :: signup :: sending response for login the user :: response",response.data.data);
                console.log("components :: signup :: sending response for login the user :: response",response.data.data.email);
                console.log("components :: signup :: sending response for login the user :: response",response.data.data.username);


                //to check the data from formdata above before sending to login
                console.log("email:: formData", formData.get("email"))
                console.log("email:: formData", formData.get("password"))
                console.log("email:: formData", formData.get("username"))

                
                    //we will login the user- which is also post type i.e, the backend will expect- email/username and password data from the frontend, 
                    //because in my backend logic that is what I am expecting.
                    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`,
                        {
                            // email: response.data.data.email,
                            // password: response.data.data.password,
                            // username: response.data.data.username
                            //----------------IMPT ERROR I was getting--------------
                            //because from the signup we were getting password as hashed value,  and we were sending it.
                            email: formData.get("email"),
                            password: formData.get("password"),
                            username: formData.get("username"),
                        },
                        
                        {
                            withCredentials:true,
                        }
                        
                    ).then((response)=>{
                        if(response){
                            console.log(`if user is logged in :: ${response.data.data}`);
                            //we also have update this in the context.See if this is correct.
                            login(response.data.data.user); //because we are sending user data by the name of user from the backend
                            //see login res.
                            navigate('/')
                            //navigate the user to home route if login also successful.
                        }

                    }).catch((error)=>{
                        console.log(`error in logging the user- components :: signup ::login:: error - ${error.message}`);
                    })

                })
            .catch((error)=>{
                console.log(`components:: signup :: registering the user :: error:: ${error}`)
            })

    }


    console.log(`entering the return part in signup`);

    return(

    <div className="min-h-screen flex">
      {/* Left Side - Branding / Illustration */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#3a262d] via-[#5c3b42] to-[#7d5259] items-center justify-center text-white p-10">
        <div className="text-left max-w-md">
          {/* <Logo width="120px" /> */}
          <h1 className="text-4xl font-bold mb-4">Welcome to <span className="text-[#ff5468]">RITERS</span></h1>
          <p className="text-lg text-[#dcc6c8]">
            Share your stories, connect with people, and explore ideas with ease.
          </p>
        </div>
      </div>

   
                <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 border-2 border-[#5c3b42]">
                <div className="w-full bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-[#5c3b42] text-center">
                    Create an Account
                </h2>
                <p className="text-sm text-center mt-2">
                    <span className="text-gray-400">Already have an account?</span>{" "}
                    <Link
                        to="/login"
                        className="text-[#3a262d] font-semibold hover:text-[#7d5259]"
                    >
                        Sign in
                    </Link>
                </p>


                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(createAccount)}className="mt-6 space-y-5">
                    <div className="space-y-5">

                    {/*  email,description */}
                    <div className="flex flex-col text-left">
                    <Input
                        label= "Name "
                        placeholder = "Enter name"
                        {...register("name", {
                            required: true,
                            
                        })}
                    />
                    </div>

                    <div className="flex flex-col text-left">
                    <Input
                        label= "Username "
                        placeholder = "Enter Username"
                        {...register("username", {
                            required: true,
                            
                        })}
                    
                    />
                    </div>

                    <div className="flex flex-col text-left">
                    <Input
                        label="Email "
                        placeholder="Enter email"
                        type="email"
                        {...register("email", {
                            required: true,
                             validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />
                    </div>
                    <div className="flex flex-col text-left">
                    <Input
                        label= "Password "
                        placeholder = "Enter password"
                        type= "password"
                        {...register("password", {
                            required: true,
                            minLength: {
                                value: 6,
                                message: "Password must have minimum 6 characters"
                            },
                            maxLength: {
                                value: 15,
                                message: "Password can have upto 15 characters"
                            }
                        })}
                    
                    />
                    </div>
                    
                    {error.password && (
                        <p className="text-red-500 text-sm">
                            {error.password.message}
                        </p>
                    )}

                    <div className="flex flex-col text-left">
                    <Input
                        label= "Confirm Password "
                        placeholder = "Confirm password"
                        type= "password"
                        {...register("confirmPassword", {
                            required: true,
                            minLength: {
                                value: 6,
                                message: "Password must have minimum 6 characters"
                            },
                            maxLength: {
                                value: 15,
                                message: "Password can have upto 15 characters"
                            }
                        })}
                    
                    />
                    </div>
                    {error.password && (
                        <p className="text-red-500 text-sm">
                            {error.password.message}
                        </p>
                    )}

                    <div className="flex flex-col text-left">
                    <Input
                        label= "Description "
                        placeholder = "Describe yourself in one line"
                        {...register("description", {
                            required: false,
                            
                        })}
                    />
                    </div>
                    
                    <div className="flex flex-col text-left">
                    <Input
                        label= "Avatar "
                        type = "file"
                        placeholder = "Upload your avatar"
                        {...register("avatar", {
                            required: true,
                            
                        })}
                    />
                    </div>
                    
                 {/* <Button //why is it necessary to have a type here in button, hitesh said if
                        //type is not specified then it will not submit why?
                    type="submit"
                >Create Account</Button> */}
                <Button type="submit" > create account </Button>

                     </div>
                </form>  
            </div>
        </div>
        </div>
    )

}

export default Signup;