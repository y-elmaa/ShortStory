import { useGetUsers } from "../../hooks/useGetUsers";
import UsersTable from "./UsersTable";
import PostsTable from "./PostsTable";

const Dashboard = () => {
  const { data: users, isLoading, isError } = useGetUsers();

  const totaluser = users?.filter((user) => user.role !== "manager");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-1.5">
            Total users
          </p>
          <p className="text-3xl font-medium">{totaluser?.length}</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-1.5">
            Total posts
          </p>
          <p className="text-3xl font-medium">
            {users?.flatMap((user) => user.posts).length}
          </p>
        </div>
      </div>

      <div className=" max-w-5xl mx-auto px-4 py-8">
        <p className="text-sm text-gray-500 font-bold flex items-center gap-1.5 mb-1.5">
          User Table
        </p>
        {users && <UsersTable users={users} />}
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-sm text-gray-500 font-bold flex items-center gap-1.5 mb-1.5">
        PostsTable
      </p>
      {users && <PostsTable users={users} />}
      </div>
      
    </div>
  );
};

export default Dashboard;
