function AdminNavbar() {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      <h2 className="text-2xl font-bold text-gray-800">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <span className="text-gray-600">
          Welcome Admin
        </span>

        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
          Logout
        </button>

      </div>
    </div>
  );
}

export default AdminNavbar;