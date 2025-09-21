import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//thought process- here complete blog has to be displayed to the user.
//we should use state for title, content, and author, so when we get them from database
//we set them.
// --------------------------------IMPT NOTE------------------------------------------
//we have to think- the current user may be the author of this post and then 2 options
//of edit and delete have to be shown to him/her.
const DisplayBlog = () => {

    const [blog, setBlog] = useState([])
    const [authorDetail, setAuthorDetail] = useState(null)
    const {author, title, id} = useParams();



        useEffect(() => {
        
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/${author}/${title}/${id}`)
            .then((response)=>{
                if(response){
                    console.log(`Displayblog:: blog to be displayed to user ${response.data.data.blog}`)
                    //what to do here.
                    setBlog(response.data.data.blog)

                    console.log(`author detail ${response.data.data.user}`)
                    setAuthorDetail(response.data.data.user);
                }
            })
            .catch((error)=> {
                console.log(`error in displaying the blog:: error ${error}`);
            })
        }, [])

        // const isAuthor =  
    
    

    return blog ? (
        <div className="py-8">
            
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {/* display image  */}

                </div>
                <div className="w-full mb-6">
                   {authorDetail?.fullname}
                </div>

                <div className="w-full mb-6">
                   {blog.title}
                </div>

                <div className="browser-css">
                   {blog.content}
                 </div>
            
        </div>
    ): null


}

export default DisplayBlog;