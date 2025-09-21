import React, { useEffect, useState } from "react";
import axios from 'axios';
import BlogCard from "../components/BlogCard";

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
            <div className='w-full py-8'>
                
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                    {
                            blogs.map((blog)=>(
                                <BlogCard key={blog._id} {...blog}/>
                            // <BlogCard {...author} {...blog }/> 
                            // rather than spreading both author and blog like this which can cause error if they contain same names like _id
                            //so we use props
                            // we are calling a blog card which will help us
                            //with displaying the blog. 
                    ))}
                    </div>
                
            </div>
        )
    }
    
     return (
            <div className="w-full py-8 mt-4 text-center">
                
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No blogs on the platform right now. Write a BLOG for us!
                            </h1>
                        </div>
                    </div>
                
            </div>
        )
    
}

export default Home;