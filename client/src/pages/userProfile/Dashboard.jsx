import {
  Users,
  CalendarDays,
  Ticket,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";

const STATS = [
  {
    label: "Total Users",
    value: "120",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    tint: "from-[#7C6AEF] to-[#5B4BD1]",
  },
  {
    label: "Total Events",
    value: "45",
    change: "+3.4%",
    trend: "up",
    icon: CalendarDays,
    tint: "from-[#F5A623] to-[#E08E00]",
  },
  {
    label: "Bookings",
    value: "320",
    change: "-2.1%",
    trend: "down",
    icon: Ticket,
    tint: "from-[#E6417A] to-[#C42E63]",
  },
  {
    label: "Revenue",
    value: "$5,400",
    change: "+12.6%",
    trend: "up",
    icon: Wallet,
    tint: "from-[#22B07D] to-[#188F65]",
  },
];

const RECENT_BOOKINGS = [
  { name: "Aarav Perera", event: "Tech Summit 2026", amount: "$120", status: "Confirmed" },
  { name: "Nadia Silva", event: "Jazz Night Live", amount: "$85", status: "Pending" },
  { name: "Kavindu Rathnayake", event: "Startup Meetup", amount: "$0", status: "Confirmed" },
  { name: "Ishara Fernando", event: "Food & Wine Fair", amount: "$45", status: "Cancelled" },
];

const STATUS_STYLE = {
  Confirmed: "bg-[#EAFBF3] text-[#188F65]",
  Pending: "bg-[#FFF6E6] text-[#B8790B]",
  Cancelled: "bg-[#FDF0F0] text-[#E5484D]",
};

const UPCOMING_EVENTS = [
  { name: "Tech Summit 2026", date: "Jul 12", venue: "BMICH, Colombo" },
  { name: "Jazz Night Live", date: "Jul 18", venue: "Cinnamon Grand" },
  { name: "Startup Meetup", date: "Jul 24", venue: "Kohuwala Hub" },
];

function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ label, value, change, trend, icon: Icon, tint }) => (
          <div
            key={label}
            className="rounded-2xl border border-[#EDEBF7] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tint}`}
              >
                <Icon size={20} className="text-white" />
              </div>

              <span
                className={[
                  "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                  trend === "up" ? "bg-[#EAFBF3] text-[#188F65]" : "bg-[#FDF0F0] text-[#E5484D]",
                ].join(" ")}
              >
                {trend === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {change}
              </span>
            </div>

            <p className="mt-4 text-sm text-[#8A85A0]">{label}</p>
            <p className="mt-1 text-3xl font-bold text-[#1C1830]">{value}</p>
          </div>
        ))}
      </div>

      {/* Lower section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent bookings */}
        <div className="rounded-2xl border border-[#EDEBF7] bg-white p-5 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#1C1830]">Recent Bookings</h3>
            <button className="rounded-lg p-1.5 text-[#8A85A0] hover:bg-[#F4F2FA]">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-[#B0ACC4]">
                  <th className="pb-3 font-medium">Guest</th>
                  <th className="pb-3 font-medium">Event</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_BOOKINGS.map((b) => (
                  <tr key={b.name} className="border-t border-[#F4F2FA]">
                    <td className="py-3 font-medium text-[#1C1830]">{b.name}</td>
                    <td className="py-3 text-[#5F5A78]">{b.event}</td>
                    <td className="py-3 text-[#5F5A78]">{b.amount}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[b.status]}`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming events */}
        <div className="rounded-2xl border border-[#EDEBF7] bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-[#1C1830]">Upcoming Events</h3>

          <div className="flex flex-col gap-4">
            {UPCOMING_EVENTS.map((e) => (
              <div key={e.name} className="flex items-center gap-3">
                <div className="flex h-11 w-11 flex-col items-center justify-center rounded-xl bg-[#F4F2FA] text-[#7C6AEF]">
                  <span className="text-[10px] font-semibold uppercase leading-none">
                    {e.date.split(" ")[0]}
                  </span>
                  <span className="text-sm font-bold leading-none">{e.date.split(" ")[1]}</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#1C1830]">{e.name}</p>
                  <p className="truncate text-xs text-[#8A85A0]">{e.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;