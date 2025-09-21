import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

//the problem I am facing- I am getting a response from the database, but I am 
//not understanding how to display it on the webpage
//the potential SOLUTION that might work- my stupid ass fignored that I am using state
//and one response from the database is obtained that is being updated in writer state.
//so now, all the writer details that I need must be fetched from the writer state.
const Writer = () => {

    const [writer, setWriter] = useState(null);
    const {username} = useParams();

    //initially the state of the writer is null, then as the page opens we
    //have to fetch the details of this writer from the database.

    useEffect(() => {
      
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/our-writers/${username}`)
            .then((response)=>{
                if(response){
                    console.log(`Writer:: individual writer details :: ${response.data.data}`);
                    setWriter(response.data.data);
                }
            })
            .catch((error)=>{
                console.log(`pages :: Writer :: error :: ${error}`);
                
            })
    }, [])
    

    return writer ?
    <div className="py-8">
            
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={writer.avatar}
                    alt={writer.fullname}
                    className="rounded-xl"
                /> 
            </div>

            <div className="w-full mb-6">
                {writer.username}
            </div>
            <div className="w-full mb-6">
                {writer?.description}
                {writer.email}
            </div>
            <div className="w-full mb-6">
                {/* here we have to fetch all the blogs written by the writer. */}
                {/* if I write writer.personalBlog I don't think it will work because they need to be looped through. */}
            </div>
            
        </div>

        : null
        //rather than null I can display writer doesnot exist in the platform.

}

export default Writer;