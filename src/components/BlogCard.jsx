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

            <div
  className="w-full 
  bg-[#dad0d1]
  rounded-xl 
  p-4 
  flex flex-col sm:flex-row 
  items-start sm:items-stretch
  justify-between
  gap-4
  transition-all duration-300 
  hover:shadow-lg 
  h-full"
>
  {/* Left Content */}
  <div className="flex flex-col justify-between flex-1 text-left">
    <h2 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-3 mb-3">
      {title}
    </h2>

    <div className="flex justify-between text-sm text-gray-700 mt-auto">
      <span>{author?.fullname}</span>
      <span>
        {new Date(createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        })}
      </span>
    </div>
  </div>

  {/* Right Image */}
  {blogImage && (
    <div className="w-full sm:w-[140px] md:w-[160px] h-[160px] sm:h-[120px] flex-shrink-0 flex items-center justify-center">
      <img
        src={blogImage}
        alt={title}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  )}
</div>


        
        </Link>
    )

}

export default BlogCard;