import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

//thought process- here complete blog has to be displayed to the user.
//we should use state for title, content, and author, so when we get them from database
//we set them.
// --------------------------------IMPT NOTE------------------------------------------
//we have to think- the current user may be the author of this post and then 2 options
//of edit and delete have to be shown to him/her.

//-------------------------------2nd IMPT NOTE----------------------------------------
//Right now, we are directly using blog.content, because of which html tags are also coming, but we
//have to change this by using dangerouslyHTML and dom purify, a concept that I was once using in RTE. there
//is no need of using this in rte but actually the place where content is being shown.
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
    
    const imgOfAuthor = authorDetail?.avatar;
    const transformedImg = imgOfAuthor?.replace('/upload/', '/upload/w_50,h_50,c_thumb,g_face/');
    

    return blog ? (
        <div className="flex justify-center py-12 px-4">
        <div className="max-w-3xl w-full">
        {/* Author Name */}
        

        {/* Blog Title */}
        <h1 className="text-3xl font-bold mb-6 text-justify mx-auto">{blog.title}</h1>

         <div className="flex items-center mb-4">
                <img
                    src={transformedImg ? transformedImg : null}
                    alt={authorDetail?.fullname}
                    className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-300"
                />
                <div className="text-gray-700 text-base font-medium">
                    {authorDetail?.fullname}
                </div>
        </div>

        <br/>
        {/* Blog Content */}
        <div
          className="prose prose-lg max-w-none text-justify mx-auto"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content),
          }}
        ></div>
      </div>
    </div>
  ) : null;


}

export default DisplayBlog;