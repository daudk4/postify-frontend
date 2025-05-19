import PostItem from "@/components/profile/PostItem";

const PostList = ({ posts, user }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium">Your Posts</h3>
      <div className="flex items-center space-x-1 text-zinc-400 text-sm">
        <span>Sort by:</span>
        <select className="bg-transparent text-blue-400 outline-none">
          <option>Recent</option>
          <option>Popular</option>
        </select>
      </div>
    </div>

    {posts.length > 0 ? (
      posts.map((post, i) => <PostItem key={i} post={post} user={user} />)
    ) : (
      <div className="text-center text-zinc-400">No posts yet.</div>
    )}
  </div>
);

export default PostList;
