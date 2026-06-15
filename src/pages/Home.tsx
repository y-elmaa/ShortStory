import { Link } from "react-router-dom";
import { usePosts } from "../hooks/useGetPosts";
import { useDeletePost } from "../hooks/useDeletePost";
import { useState } from "react";
import { useAuth } from "../hooks/useTokens";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const HomePage = () => {
  dayjs.extend(relativeTime);
  const owner = useAuth((state) => state.userId);
  const user = useAuth((state) => state.name);
  const [deletin, setDeleting] = useState<number | null>(null);
  const { data: posts, isLoading, error } = usePosts();
  const deletePost = useDeletePost();
  const handleDelete = (id: number) => {
    setDeleting(id);
    deletePost.mutate(id, {
      onSettled: () => {
        setDeleting(null);
      },
    });
  };
  if (isLoading) return <p>loading ....</p>;
  if (error) return <p> Error</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Latest Posts</h1>

      {posts?.map((post) => {
        const isOwner = owner === post.user_id;
        return (
          <div
            key={post.id}
            className="mb-6 shadow-xl shadow-sky-100 border-2 border-gray-100 p-5 rounded-2xl hover:shadow-sky-200 transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              {isOwner && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deletin === post.id}
                    className="bg-gray-200 text-black px-3 py-1 rounded-lg hover:bg-gray-900 hover:text-white disabled:opacity-50 text-sm"
                  >
                    {deletin === post.id ? "Deleting ..." : "Delete"}
                  </button>
                  <Link
                    to={`/update-post/${post.id}`}
                    className="bg-gray-900 text-white hover:bg-gray-200 hover:text-black px-3 py-1 rounded-lg  text-sm"
                  >
                    Update
                  </Link>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-400 mb-3">
              Created by {user} : {dayjs(post.created_at).fromNow()}
            </p>
            <p className="text-gray-700 leading-7 break-word line-clamp-3 mb-3">
              {post.body}
            </p>
            <Link
              to="/fullpost"
              state={{ post, user }}
              className="text-sm font-medium text-gray-900 hover:underline"
            >
              Show more →
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
