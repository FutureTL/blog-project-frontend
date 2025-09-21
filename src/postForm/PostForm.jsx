import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import RTE from "../components/RTE";
import axios from "axios";

const PostForm = ({username}) => {
    
    const navigate = useNavigate();

    const {register, handleSubmit, control, getValues, setValue} = useForm({

       defaultValues: {
            title : "",
            content : ""
       }
    })

    const submitPost = (data) => {
        //user has created a post, and have to save it to database of the user
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/${username}/new-blog`,{
            
            title:data.title,
            content: data.content,
        }
        ).then((response) => {
            if(response){
                console.log(`PostForm:: post is published response :: `, response)
                //if published, then redirect to home page
                navigate('/');
            }})
        .catch((error)=>{
            console.log(`PostForm :: submitPost :: error ${error}`);

        })
        

    }


    return(
        <div>
            <form onSubmit={handleSubmit(submitPost)}>

                <Input 
                    
                    placeholder= "Enter title of the blog"
                        
                    {...register("title",{
                        required:true,
                        
                    })}
                
                />

                    {/* here instead of input tag for content I think RTE must come.*/}
                <RTE label="Content :" name= "content" control={control} defaultValue={getValues("content")} />

                <button 
                    type="submit" 
                    className="bg-pink-200 hover:bg-pink-300 text-black font-semibold 
                        py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer my-4"
                >
                Submit
                </button>


            </form>
        
        </div>
    )
}

export default PostForm;