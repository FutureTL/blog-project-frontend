import React from "react";
import { Link } from "react-router-dom";


const getTransformedUrl = (url, {width=400, height=400, crop= "scale",quality="auto", format= "auto"} = {}) =>{
    if (!url.includes("/upload/")) return url; // not a Cloudinary URL
    return url.replace(
    "/upload/",
    `/upload/w_${width},h_${height},c_${crop},q_${quality},f_${format}/`
  );

};

const BlogCard= ({_id, title, author, content, createdAt}) => {

 //this id is blog id, and author is giving author id.

    const getFirstImage = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        const img = div.querySelector("img");
        if(!img) return null;
        return getTransformedUrl(img.src, { width:400, height:100 });
    };

    const blogImage = getFirstImage(content);

    return(//this link needs to be corrected.
       <Link to={`/${author?.username}/${title}/${_id}`}> 

            {/* <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between"> */}
             <div className=" w-[500px] h-[180px]
                bg-[#dad0d1]
                rounded-xl 
                p-4 
                flex
                transition-all 
                duration-300 
                hover:shadow-md          
                transition-all duration-300">
                
                

                 <div className="flex-1 flex-col justify-between">
                 <h2 className="text-lg font-bold text-gray-900 line-clamp-3 text-left mb-2">
                    {title}
                </h2>
                
        
                <div className="flex justify-between  text-sm text-gray-700 mt-16">
                    <span>{author?.fullname}</span>
                    <span>
                            {new Date(createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                            })}
                    </span>
                </div>
               
            </div>

             {blogImage && (
                    <div className="w-[160px] h-[100px] flex-shrink-0 flex items-center justify-center">
                        <img 
                            src={blogImage} 
                            alt={title} 
                            className="w-full h-full rounded-lg" 
                        />
                    </div>
             )}

            </div>
        
        </Link>
    )

}

export default BlogCard;