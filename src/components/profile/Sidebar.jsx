import React from "react";
import UserAvatar from "@/components/profile/UserAvatar";
import ProfileStats from "@/components/profile/ProfileStats";

const Sidebar = ({ user }) => (
  <div className="md:w-1/4">
    <div className="bg-zinc-800 rounded-xl p-4 shadow-lg border border-zinc-700">
      <div className="flex items-center space-x-3 mb-4">
        <UserAvatar name={user.name} />
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-zinc-400 text-sm">@{user.username}</p>
        </div>
      </div>

      <ProfileStats count={user.posts?.length || 0} />

      <div className="space-y-3">
        {["Home", "Profile", "Notifications", "Settings"].map((label, i) => (
          <a
            key={i}
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <i
              className={`fas fa-${
                ["home", "user", "bell", "cog"][i]
              } text-zinc-400`}
            />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default Sidebar;
