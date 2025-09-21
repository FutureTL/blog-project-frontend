import React, { useEffect } from "react";
import PostForm from '../postForm/PostForm';
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
//Check : user is logged in or not-using context we can check this.
//if user is not logged in then redirect to login page.
//else go to add post
//we are going to use authContext.
const AddPost = ()=>{

    console.log(`AddPost entered`);
    
    const navigate = useNavigate();
    const {username} = useParams();
    const {user} = useAuth();
    console.log(`AddPost :: user? :: ${user}`);

    useEffect(()=>{

        if(user == null){
            navigate('/login');
        }
    },[])
    

    //if this user is not null, then user is logged in else we redirect the
    //user to login page.

    return(
        <div>
            <PostForm username= {username}/>
        </div>

    )

}

export default AddPost;