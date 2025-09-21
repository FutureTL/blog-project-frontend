import React from "react";
import { Link } from "react-router-dom";

//card is going to be a clickable link.
//what all to display on the card: avatar, username, description

const WriterCard = ({_id, username, description, avatar}) => {

   
        
    return(//this link needs to be corrected.
       <Link to={`/our-writers/${username}`}> 

            <div className="w-fu;; bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                     <img src= { avatar } alt= {username} /> 
                    {/* the alt or alternate text of image tag shows the text that will be displayed when the image file cannot be loaded. */}
                </div>
                <h2
                className="text-xl font-bold"
                > {username} </h2>
                <h6
                className="text-xl font-bold"
                > {description} </h6>
            </div>
        
        </Link>
    )

}

export default WriterCard;