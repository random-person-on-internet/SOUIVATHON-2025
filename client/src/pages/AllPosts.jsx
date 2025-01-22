import React, { useState, useEffect } from "react";
import { PostCard, Container } from "../components";

// appwrite
import dbService from "../appwrite/dbService.js";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dbService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"> */}
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
