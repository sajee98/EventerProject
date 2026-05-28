function Dashboard() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Total Events</h2>
          <p className="text-3xl font-bold mt-2">45</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Bookings</h2>
          <p className="text-3xl font-bold mt-2">320</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold mt-2">$5,400</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;