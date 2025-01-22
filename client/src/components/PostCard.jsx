import React from "react";

// appwrite
import service from "../appwrite/dbService";
import storageHandler from "../appwrite/storageService";

// routes
import { Link } from "react-router-dom";

// can get : title, content, featuredImage, status, userId,
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div
        className="w-full bg-gray-900 rounded-lg p-5 shadow-md 
                  hover:shadow-lg hover:shadow-green-500/50
                  transition duration-300 border border-gray-700"
      >
        {/* Image */}
        <div className="w-full mb-4 justify-center rounded-lg">
          <img
            src={storageHandler.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
          {/* {console.log(storageHandler.getFilePreview(featuredImage))} */}
          {/* was just debugging, ignore this line :) */}
        </div>
        <h2 className="text-lg font-semibold text-gray-100 group-hover:text-green-400 transition-colors duration-300">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;

// return (
//   <Link to={`/post/${$id}`}>
//     <div className="w-full bg-gray-100 rounded-xl p-4">
//       <div className="w-full justify-center mb-4">
//         <img
//           src={appwriteService.getFilePreview(featuredImage)}
//           alt={title}
//           className="rounded-xl"
//         />
//       </div>
//       <h2 className="text-xl font-bold">{title}</h2>
//     </div>
//   </Link>
// );
