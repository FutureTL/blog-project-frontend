import React from "react";
import { Link } from "react-router-dom";


const BlogCard= ({_id, title, author, content}) => {

 //this id is blog id, and author is giving author id.

    const getFirstImage = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        const img = div.querySelector("img");
        return img ? img.src : "https://via.placeholder.com/300x200?text=No+Image"; 
    };

    const blogImage = getFirstImage(content);

    return(//this link needs to be corrected.
       <Link to={`/${author?.username}/${title}/${_id}`}> 

            {/* <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between"> */}
             <div className="w-full bg-pink-200 hover:bg-white border-2 border-pink-400 rounded-xl p-4 transition-colors duration-300">
                <div className="w-full justify-center mb-4">
                    <img src= { blogImage } alt= {title} />
                    {/* the alt or alternate text of image tag shows the text that will be displayed when the image file cannot be loaded. */}
                </div>
                 <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {title}
                </h2>
                <h6 className="text-sm text-gray-600 mb-4"> 
                    {author?.fullname} 
                </h6>
            </div>
        
        </Link>
    )

}

export default BlogCard;