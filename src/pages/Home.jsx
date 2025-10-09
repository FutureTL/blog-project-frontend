import React, { useEffect, useState } from "react";
import axios from 'axios';
import BlogCard from "../components/BlogCard";
import Lottie from 'lottie-react';
import FrontPageAnimate from './../lotties/frontPageLottie.json';

//what is thinking- as soon as the home page loads,the user must be shown
//all the posts(in which order or the preference for each user is not my concern right now).

//-q1-----I am thinking we should have a context for posts and then load all the posts from there.
//-q2-----should we have a loading state, because in the last project, Hitesh had created it, but I will 
//not create it here and see if we actually need it.
// -----------the answer for q2----------
//yes I am adding loading state because that will make the app user friendly.
const Home = () => {

    //error we got- here we had written null inside blogs, so during blogs.length and blogs being
    //null will through an error. So, we should pass an empty array.
    const [blogs, setBlogs] = useState([]); 
    //------------------DOUBT -----------------------
    //I have created a state for blogs. when I get the responsw from the backend,
    //I fill it in blogs, so i also want the user details, so should also create a state for it??

    

    useEffect(() => {
      //load all the posts:
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/personal-blogs`)
        .then((response)=>{
            if(response){
                console.log(`the respnse for personal blogs: `, response.data.data);
                setBlogs(response.data.data)

                
                //-----------------Error potential here-----------------//
                //what response we are setting in setBlogs matters. right, because
                //then wrong response means that array of blogs may not be added in blogs and then
                //it will through error like I was getting for blogs.length because length is valid
                //for arrays.


                //all the personal blogs are received:
                //now we have to display them on the screen, then we need to set 
                //their state, that means we need a state for blogs, we use useState.

            }
        })
        .catch((error)=> {
                console.log(`home page :: error in fetching the blogs :: ${error}`);
        })


    })
    


    if (blogs.length > 0) {

       return(

       <div className="min-h-screen flex flex-col items-center justify-center  bg-gradient-to-br from-[#d6b1b5] to-white">
      
          {/* Hero Section */}
          <section className="w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-12 md:px-16 py-12 bg-gradient-to-r from-[#d6b1b5] to-white">
            {/* Left Text Section */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-[#3a262d] leading-tight">
                <span>
                  Share your <span className="text-[#ff5468]">STORIES</span> &
                </span>
                <br />
                <span>Be a part of someone else's</span>
              </h1>

              <button className="bg-[#ff5468] hover:bg-[#6a3c4a] text-white px-6 py-3 rounded-lg shadow-md transition duration-300">
                Start Writing
              </button>
            </div>

            {/* Right Animation Section */}
            <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
              <Lottie
                animationData={FrontPageAnimate}
                loop
                className="w-64 md:w-90"
              />
            </div>
      </section>

      {/* horizontal line to  separate blogs */}
      <hr className="w-full border-t-4 border-[#9a5a60] " />

      {/* Blog Section */}
      <section className="w-full px-6 md:px-16 py-4 bg-[#3a262d]">
       <div className="max-w-5xl mx-auto px-4 py-12">
                    <h1 className="text-2xl font-bold text-white mb-12">Latest Blogs</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} {...blog} />
                    ))}
                    </div>
           </div>
      </section>
    </div>
        )
    }
    
     return (
            <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-100 to-pink-50 py-16">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Share your STORIES &
            </h1>
            <p className="text-lg text-gray-600 mb-6">
             Be part of someone else's
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg shadow-md transition">
              Start Reading
            </button>
          </div>

          {/* Animation / Image */}
          <div className="flex-1">
            <Lottie animationData={FrontPageAnimate} loop={true} />
            </div>
            <div> <h3>Write a blog for us today!</h3></div>
        </div>
      </div>
    </div>
)
    
}

export default Home;


{/* <div className="max-w-5xl mx-auto px-4 py-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-8">Latest Blogs</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} {...blog} />
                    ))}
                    </div>
            // </div> */}