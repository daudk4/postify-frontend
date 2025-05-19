const UserAvatar = ({ name }) => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
      {name.charAt(0).toUpperCase()}
    </div>
  </div>
);

export default UserAvatar;
