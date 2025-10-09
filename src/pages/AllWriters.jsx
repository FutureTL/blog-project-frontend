import axios from "axios";
import React, {useEffect, useState} from "react";
import WriterCard from "../components/WriterCard";

//when I click on the 'all writers' button on the home page-
//I will be redirected to this page showing all the writers.

const AllWriters = () => {

    const [writers, setWriters] = useState([]);

    useEffect(() => {
      
        //as soon as the page loads we have to do this.
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/our-writers`)
        .then((response)=>{
            if(response){
                console.log(`pages::AllWriters :: details of all writers :: ${response.data.data}`);
                setWriters(response.data.data);
                //we should get all these things.
                //username, 
                // fullname,
                // email,
                // description,
                // blogs of the writer
                // avatar
                
            }

        })
        .catch((error)=>{
            console.log(`pages:: Allwriters :: error ${error}`);
            
        })
    }, [])
    

   if(writers.length == 0){
        return(
            <div className="w-full py-8 mt-4 text-center">
                    
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No writers on the platform right now. Become a writer today!
                    
                                </h1>
                            </div>
                        </div>
                    
                </div>
        )
   }
   else{
    return(
    <div className='w-full py-8'>
       
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 md:px-16 py-10'>
            {
                writers.map( (writer) => (

                    <WriterCard key ={writer._id} {...writer}/>
                    //we want to display cards for the writers that the user can click
                ) )
            }
            </div>
        
    </div>

   )}

}

export default AllWriters;