import { useState } from "react";

function Vendors() {
  const [vendors] = useState([
    {
      id: 1,
      name: "ABC Catering",
      service: "Food & Catering",
      email: "abc@gmail.com",
      phone: "0771234567",
      status: "Active",
    },
    {
      id: 2,
      name: "Dream Decor",
      service: "Decoration",
      email: "decor@gmail.com",
      phone: "0719876543",
      status: "Pending",
    },
    {
      id: 3,
      name: "Sound Masters",
      service: "Sound System",
      email: "sound@gmail.com",
      phone: "0751122334",
      status: "Active",
    },
  ]);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vendors</h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + Add Vendor
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Service</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="border-t">

                <td className="p-4">{vendor.id}</td>
                <td className="p-4 font-semibold">{vendor.name}</td>
                <td className="p-4">{vendor.service}</td>
                <td className="p-4">{vendor.email}</td>
                <td className="p-4">{vendor.phone}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      vendor.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {vendor.status}
                  </span>
                </td>

                <td className="p-4 flex gap-2">

                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>

                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
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

export default Vendors;