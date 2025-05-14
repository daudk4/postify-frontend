import React from "react";
import UserAvatar from "@/components/profile/UserAvatar";

const Navbar = ({ user }) => (
  <nav className="bg-zinc-800 border-b border-zinc-700 py-3 px-6 sticky top-0 z-10 shadow-md">
    <div className="max-w-5xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="text-blue-500 text-2xl">
          <i className="fas fa-comment-dots"></i>
        </div>
        <h1 className="text-xl font-semibold">SocialFeed</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-zinc-700 text-sm rounded-full py-1.5 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-400">
            <i className="fas fa-search text-xs"></i>
          </div>
        </div>

        <UserAvatar name={user.name} />
        <a
          href="/logout"
          className="bg-red-500 hover:bg-red-600 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
        >
          <span>Logout</span>
          <i className="fas fa-sign-out-alt text-xs"></i>
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
