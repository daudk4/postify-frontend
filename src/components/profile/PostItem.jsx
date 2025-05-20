import { PostActions } from "@/components/profile/PostActions";

const PostItem = ({ post, user }) => (
  <div className="post bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 overflow-hidden animate-in">
    <div className="p-4">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{user.name}</h4>
              <p className="text-zinc-400 text-xs">
                @{user.username} · Just now
              </p>
            </div>
          </div>
          <p className="mt-2 text-sm">{post.content}</p>
        </div>
      </div>
      <div className="h-[1px] bg-zinc-500 mt-4"></div>
      <PostActions />
    </div>
  </div>
);

export default PostItem;
