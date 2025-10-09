import React from "react";
import { Link } from "react-router-dom";

const WriterCard = ({ _id, username, fullname, description, avatar }) => {
  const transformedImg = avatar
    ? avatar.replace("/upload/", "/upload/w_80,h_80,c_thumb,g_face/")
    : null;

  return (
    <Link to={`/our-writers/${username}`}>
      <div className="bg-[#3a262d] rounded-xl p-4 flex items-start hover:shadow-md transition-transform duration-300 hover:-translate-y-1 h-full max-h-40">
        {/* Avatar */}
        {transformedImg && (
          <img
            src={transformedImg}
            alt={username}
            className="w-20 h-20 rounded-full object-cover border border-gray-300 mr-4 flex-shrink-0"
          />
        )}

        {/* Text */}
        <div className="flex flex-col justify-between text-left overflow-hidden w-full">
          <div className="truncate">
            <h2 className="text-lg font-bold text-white">{fullname}</h2>
            <h4 className="text-md font-bold text-gray-300">@{username}</h4>
          </div>
          <p className="text-sm text-gray-300 mt-2 line-clamp-3">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default WriterCard;
