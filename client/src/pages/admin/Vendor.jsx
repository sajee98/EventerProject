import { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  UtensilsCrossed,
  Palette,
  Music,
  Building2,
  Mail,
  Phone,
} from "lucide-react";

const SERVICE_ICON = {
  "Food & Catering": UtensilsCrossed,
  "Decoration": Palette,
  "Sound System": Music,
};

const STATUS_STYLE = {
  Active: "bg-[#EAFBF3] text-[#188F65]",
  Pending: "bg-[#FFF6E6] text-[#B8790B]",
};

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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1830] sm:text-3xl">Vendors</h1>
          <p className="mt-1 text-sm text-[#8A85A0]">
            Manage the vendors working on your events.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#7C6AEF] to-[#5B4BD1] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:shadow-md active:scale-[0.98]">
          <Plus size={17} />
          Add Vendor
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#B0ACC4]"
        />
        <input
          type="text"
          placeholder="Search vendors..."
          className="w-full rounded-xl border border-[#EDEBF7] bg-white py-2.5 pl-9 pr-3 text-sm text-[#1C1830] placeholder:text-[#B0ACC4] focus:border-[#7C6AEF] focus:outline-none focus:ring-2 focus:ring-[#7C6AEF]/20"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[#EDEBF7] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#EDEBF7] bg-[#FAFAFC] text-xs uppercase tracking-wide text-[#B0ACC4]">
                <th className="px-5 py-3.5 font-medium">Vendor</th>
                <th className="px-5 py-3.5 font-medium">Service</th>
                <th className="px-5 py-3.5 font-medium">Contact</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {vendors.map((vendor) => {
                const ServiceIcon = SERVICE_ICON[vendor.service] ?? Building2;
                return (
                  <tr
                    key={vendor.id}
                    className="border-t border-[#F4F2FA] transition-colors hover:bg-[#FAFAFC]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C6AEF] to-[#E6417A] text-sm font-semibold text-white">
                          {vendor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1C1830]">{vendor.name}</p>
                          <p className="text-xs text-[#B0ACC4]">ID #{String(vendor.id).padStart(3, "0")}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="flex w-fit items-center gap-1.5 rounded-full bg-[#F4F2FA] px-3 py-1 text-xs font-medium text-[#5F5A78]">
                        <ServiceIcon size={13} />
                        {vendor.service}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1 text-xs text-[#5F5A78]">
                        <span className="flex items-center gap-1.5">
                          <Mail size={13} className="text-[#B0ACC4]" />
                          {vendor.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone size={13} className="text-[#B0ACC4]" />
                          {vendor.phone}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[vendor.status]}`}
                      >
                        {vendor.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          title="View"
                          className="rounded-lg p-2 text-[#8A85A0] transition-colors hover:bg-[#F4F2FA] hover:text-[#7C6AEF]"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          title="Edit"
                          className="rounded-lg p-2 text-[#8A85A0] transition-colors hover:bg-[#FFF6E6] hover:text-[#B8790B]"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          title="Delete"
                          className="rounded-lg p-2 text-[#8A85A0] transition-colors hover:bg-[#FDF0F0] hover:text-[#E5484D]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
       <div className="overflow-hidden rounded-2xl border border-[#EDEBF7] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#EDEBF7] bg-[#FAFAFC] text-xs uppercase tracking-wide text-[#B0ACC4]">
                <th className="px-5 py-3.5 font-medium">Vendor</th>
                <th className="px-5 py-3.5 font-medium">Service</th>
                <th className="px-5 py-3.5 font-medium">Contact</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {vendors.map((vendor) => {
                const ServiceIcon = SERVICE_ICON[vendor.service] ?? Building2;
                return (
                  <tr
                    key={vendor.id}
                    className="border-t border-[#F4F2FA] transition-colors hover:bg-[#FAFAFC]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C6AEF] to-[#E6417A] text-sm font-semibold text-white">
                          {vendor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1C1830]">{vendor.name}</p>
                          <p className="text-xs text-[#B0ACC4]">ID #{String(vendor.id).padStart(3, "0")}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="flex w-fit items-center gap-1.5 rounded-full bg-[#F4F2FA] px-3 py-1 text-xs font-medium text-[#5F5A78]">
                        <ServiceIcon size={13} />
                        {vendor.service}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1 text-xs text-[#5F5A78]">
                        <span className="flex items-center gap-1.5">
                          <Mail size={13} className="text-[#B0ACC4]" />
                          {vendor.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone size={13} className="text-[#B0ACC4]" />
                          {vendor.phone}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[vendor.status]}`}
                      >
                        {vendor.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          title="View"
                          className="rounded-lg p-2 text-[#8A85A0] transition-colors hover:bg-[#F4F2FA] hover:text-[#7C6AEF]"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          title="Edit"
                          className="rounded-lg p-2 text-[#8A85A0] transition-colors hover:bg-[#FFF6E6] hover:text-[#B8790B]"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          title="Delete"
                          className="rounded-lg p-2 text-[#8A85A0] transition-colors hover:bg-[#FDF0F0] hover:text-[#E5484D]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Vendors;