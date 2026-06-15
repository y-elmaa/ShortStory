// ShowFullPost.tsx — read it from location state
import { useLocation, useNavigate } from "react-router-dom";
import type { Post } from "../hooks/useGetPosts";
import dayjs from "dayjs";

const ShowFullPost = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.post) {
    navigate("/");
    return null;
  }

  const { post, user }: { post: Post; user: string } = state;

  return (
    <div className="mb-6 shadow-xl shadow-sky-100 border-2 border-gray-100 p-5 rounded-2xl hover:shadow-sky-200 transition-shadow max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-400 mb-6">
        Created by {user} · {dayjs(post.created_at).fromNow()}
      </p>
      <p className="text-gray-700 leading-7 break-word ">{post.body}</p>
    </div>
  );
};

export default ShowFullPost;