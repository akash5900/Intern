import useAuth from "../../context/useAuth";

export default function Allusers() {
  const { users, deleteUser } = useAuth()
  return (
    <div className="space-y-4 text-gray-900">
      <div className="text-xl font-semibold">
        <h1>All Users</h1>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full border border-gray-200 border-collapse table-fixed">
          <thead className="bg-blue-200">
            <tr className="text-lg pl-1">
              <th className="p-2">User_Id</th>
              <th className="p-2">Name</th>
              <th className="p-2 ">Email</th>
              <th className="p-2 ">Mobile Number</th>
              <th className="p-2">Role</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 font-semibold text-sm"
              >
                <td className="p-3 text-center">#{user._id}</td>
                <td className="p-3 text-center">{user.username}</td>
                <td className="p-3 text-center">{user.email} </td>
                <td className="p-3 text-center">{user.mobilenumber}</td>
                <td className="p-3 text-center">{user.role || "User"}</td>
                <td className="p-3 text-center">
                  <button
                    className="border border-gray-800 px-2 rounded hover:bg-red-400 cursor-pointer"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
