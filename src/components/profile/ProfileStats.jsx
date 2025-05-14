const ProfileStats = ({ count }) => (
  <div className="flex justify-between text-center py-3 border-t border-b border-zinc-700 mb-4">
    <div>
      <div className="font-bold">{count}</div>
      <div className="text-xs text-zinc-400">Posts</div>
    </div>
    <div>
      <div className="font-bold">0</div>
      <div className="text-xs text-zinc-400">Following</div>
    </div>
    <div>
      <div className="font-bold">0</div>
      <div className="text-xs text-zinc-400">Followers</div>
    </div>
  </div>
);

export default ProfileStats;
