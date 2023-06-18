import { useSelector } from "react-redux";

export const CommentItem = ({ com }) => {
  const { user } = useSelector((state) => state.auth);

  const avatar = user?.username[0];

  return (
    <div className="flex items-center gap-3 mt-3">
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm font-extrabold text-gray-800">
        {avatar}
      </div>
      <div className="flex text-gray-300 text-[10px]">{com.comment}</div>
    </div>
  );
};
