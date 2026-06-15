import type { User } from '../../hooks/useGetUsers'
import dayjs from 'dayjs'
import { useDeletePostUser } from '../../hooks/useDeletePostUser'
interface Props{
    users:User[]
}
const PostsTable = ({users}:Props) => {
  const deletePost = useDeletePostUser();

  return (
    <>
     {users?.some((user) => user.posts.length > 0) && (
   
    <div className="overflow-x-auto rounded-xl border border-gray-200">

      {/* Table: desktop only */}
      <table className="w-full border-collapse hidden md:table">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">Title</th>
            <th className="p-3 border-b">Author</th>
            <th className="p-3 border-b">Created At</th>
            <th className="p-3 border-b">Updated At</th>
            <th className="p-3 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) =>
            user.posts?.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{post.title}</td>
                <td className="p-3 text-gray-500 text-sm">{user.name}</td>
                <td className="p-3 text-gray-500 text-sm">
                  {dayjs(post.created_at).format("DD/MM/YYYY")}
                </td>
                <td className="p-3 text-gray-500 text-sm">
                  {dayjs(post.updated_at).format("DD/MM/YYYY")}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => deletePost.mutate(post.id)}
                    disabled={deletePost.isPending}
                    className="bg-gray-200 text-black px-3 py-1 rounded-lg hover:bg-gray-900 hover:text-white disabled:opacity-50 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Cards: mobile only */}
      <div className="flex flex-col divide-y md:hidden">
        {users?.map((user) =>
          user.posts?.map((post) => (
            <div key={post.id} className="p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium">{post.title}</span>
                <button
                  onClick={() => deletePost.mutate(post.id)}
                  disabled={deletePost.isPending}
                  className="shrink-0 bg-gray-200 text-black px-3 py-1 rounded-lg hover:bg-gray-900 hover:text-white disabled:opacity-50 text-sm"
                >
                  Delete
                </button>
              </div>
              <span className="text-sm text-gray-500">By {user.name}</span>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>Created {dayjs(post.created_at).format("DD/MM/YYYY")}</span>
                <span>Updated {dayjs(post.updated_at).format("DD/MM/YYYY")}</span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
   
)}
    </>
  
     
  )
}

export default PostsTable
