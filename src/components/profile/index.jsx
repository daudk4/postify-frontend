import React from "react";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/profile/Sidebar";
import CreatePost from "@/components/profile/CreatePost";
import PostList from "@/components/profile/PostList";
import { useAuth } from "@/contexts/auth";

const Profile = () => {
  const { currentUser } = useAuth();
  const posts = [...(currentUser.posts || [])].reverse();

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <Navbar user={currentUser} />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar user={currentUser} />
          <div className="md:w-2/4">
            <CreatePost />
            <PostList posts={posts} user={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
