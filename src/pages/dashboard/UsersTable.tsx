import type { User } from "../../hooks/useGetUsers";
import dayjs from "dayjs";
import { useDeleteUser } from "../../hooks/useDeleteUser";
interface Props {
  users: User[];
}
const UsersTable = ({ users }: Props) => {
  const deleteUser = useDeleteUser();

  return (
     
<div className="overflow-x-auto rounded-xl border border-gray-200">
  <table className="w-full border-collapse hidden md:table">
    <thead>
      <tr className="bg-gray-100 text-left">
        <th className="p-3 border-b">Name</th>
        <th className="p-3 border-b">Email</th>
        <th className="p-3 border-b">Role</th>
        <th className="p-3 border-b">Posts</th>
        <th className="p-3 border-b">Created At</th>
        <th className="p-3 border-b">Delete</th>
      </tr>
    </thead>
    <tbody>
      {users?.map(
        (user) =>
          user.role !== "manager" && (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <span className="px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  {user.role}
                </span>
              </td>
              <td className="p-3 text-gray-500 text-sm">{user.posts.length}</td>
              <td className="p-3 text-gray-500 text-sm">
                {dayjs(user.created_at).format("DD/MM/YYYY")}
              </td>
              <td className="p-3">
                <button
                  onClick={() => deleteUser.mutate(user.id)}
                  disabled={deleteUser.isPending}
                  className="bg-gray-200 text-black px-3 py-1 rounded-lg hover:bg-gray-900 hover:text-white disabled:opacity-50 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ),
      )}
    </tbody>
  </table>

  <div className="flex flex-col divide-y md:hidden">
    {users?.map(
      (user) =>
        user.role !== "manager" && (
          <div key={user.id} className="p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{user.name}</span>
              <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                {user.role}
              </span>
            </div>
            <span className="text-sm text-gray-500">{user.email}</span>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{user.posts.length} posts · {dayjs(user.created_at).format("DD/MM/YYYY")}</span>
              <button
                onClick={() => deleteUser.mutate(user.id)}
                disabled={deleteUser.isPending}
                className="bg-gray-200 text-black px-3 py-1 rounded-lg hover:bg-gray-900 hover:text-white disabled:opacity-50 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ),
    )}
  </div>
</div>
  );
};

export default UsersTable;
