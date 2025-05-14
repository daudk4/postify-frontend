import React from "react";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/profile/Sidebar";
import CreatePost from "@/components/profile/CreatePost";
import PostList from "@/components/profile/PostList";

const Profile = ({ user }) => {
  const posts = [...(user.posts || [])].reverse();

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <Navbar user={user} />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar user={user} />
          <div className="md:w-2/4">
            <CreatePost />
            <PostList posts={posts} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
