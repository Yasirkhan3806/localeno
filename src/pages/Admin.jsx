
import React from "react";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  Users,
  UserCheck,
  FileWarning,
  Settings,
  LogOut,
  Bell,
  Search,
  Box,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SIDEBAR_MENU = [
  { label: "Dashboard", icon: LayoutGrid, active: true },
  { label: "Products", icon: Package },
  { label: "Orders", icon: ShoppingCart },
  { label: "Customers", icon: Users },
  { label: "Sellers", icon: UserCheck },
  { label: "Reports", icon: FileWarning },
  { label: "Settings", icon: Settings },
];

const RECENT_ORDERS = [
  { id: "#001", customer: "John Smith", amount: "$125.00", status: "Completed" },
  { id: "#002", customer: "Sarah Wilson", amount: "$89.50", status: "Processing" },
  { id: "#003", customer: "Mike Johnson", amount: "$247.25", status: "Shipped" },
  { id: "#004", customer: "Emily Brown", amount: "$156.75", status: "Pending" },
  { id: "#005", customer: "David Lee", amount: "$98.30", status: "Completed" },
];

const STATUS_STYLES = {
  Completed: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const KPI_CARDS = [
  {
    label: "Total Revenue",
    value: "$45,231",
    icon: "$",
    footer: {
      value: "+20.1%",
      desc: "vs last month",
      color: "text-green-600",
      indicator: "▲",
    },
  },
  {
    label: "Orders",
    value: "2,345",
    icon: <ShoppingCart size={28} className="text-gray-400" />,
    footer: {
      value: "+12.5%",
      desc: "vs last month",
      color: "text-green-600",
      indicator: "▲",
    },
  },
  {
    label: "Customers",
    value: "1,234",
    icon: <Users size={28} className="text-gray-400" />,
    footer: {
      value: "+8.2%",
      desc: "vs last month",
      color: "text-green-600",
      indicator: "▲",
    },
  },
  {
    label: "Products",
    value: "856",
    icon: <Box size={28} className="text-gray-400" />,
    footer: {
      value: "-2.1%",
      desc: "vs last month",
      color: "text-red-600",
      indicator: "▼",
    },
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-20 px-6 flex items-center border-b border-gray-200">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2">
            <span className="flex flex-col items-center bg-white rounded-lg px-2 py-1 font-inter min-w-0 w-auto">
              <span className="flex items-center text-xl font-extrabold text-gray-900 tracking-tight" style={{ letterSpacing: '0.08em' }}>
                <span style={{ letterSpacing: '0.13em', marginRight: '2px' }}>LOC</span>
                <span className="inline-flex items-center justify-center mx-0.5">
                  <ShoppingCart size={18} className="text-green-700 mr-1" strokeWidth={2.2} />
                </span>
                <span style={{ letterSpacing: '0.13em', marginLeft: '2px' }}>LENA</span>
              </span>
            </span>
          </button>
        </div>
        {/* Menu */}
        <nav className="flex-1 py-4 flex flex-col gap-1">
          {SIDEBAR_MENU.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 w-full px-6 py-2.5 text-[15px] font-medium rounded-lg transition
              ${item.active
                  ? "bg-black text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
              style={{ marginBottom: 2 }}
            >
              <item.icon size={20} className={item.active ? "text-white" : "text-gray-500"} />
              {item.label}
            </button>
          ))}
        </nav>
        {/* Logout */}
        <div className="mt-auto mb-4 px-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg font-semibold transition
              bg-white text-gray-700 hover:bg-black hover:text-white border border-gray-200 shadow"
          >
            <LogOut size={20} className="mr-1" />
            Logout
          </button>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-20 px-8 flex items-center justify-between border-b border-gray-200 bg-white">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h2>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-[#F5F6FA] text-gray-900 text-sm w-64 focus:border-black focus:ring-2 focus:ring-black"
              />
              <Search size={18} className="absolute left-2 top-2.5 text-gray-400" />
            </div>
            {/* Notification */}
            <div className="relative">
              <button className="p-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200">
                <Bell size={20} className="text-gray-500" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 pt-0.5 pb-0 w-5 h-5 flex items-center justify-center">2</span>
              </button>
            </div>
            {/* Admin Info */}
            <div className="flex items-center gap-3 pl-4">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full font-bold text-lg border-2 border-gray-100">A</div>
              <span className="text-gray-900 font-bold">Admin</span>
            </div>
            {/* Logout icon */}
            <button
              className="ml-2 p-2 rounded-full hover:bg-gray-100 transition"
              title="Logout"
              onClick={handleLogout}
            >
              <LogOut size={22} className="text-gray-400 hover:text-red-500" />
            </button>
          </div>
        </div>
        {/* KPIs */}
        <section className="p-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {KPI_CARDS.map((card, idx) => (
            <div key={card.label}
              className="bg-white rounded-xl px-6 py-5 flex flex-col justify-between shadow border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="text-gray-500 text-sm font-medium">{card.label}</div>
                <div className="text-2xl">{typeof card.icon === "string" ? card.icon : card.icon}</div>
              </div>
              <div className="mt-3 mb-0 font-extrabold text-2xl text-gray-900">{card.value}</div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className={card.footer.color + " font-semibold flex items-center"}>
                  {card.footer.indicator}&nbsp;{card.footer.value}
                </span>
                <span className="text-gray-500">{card.footer.desc}</span>
              </div>
            </div>
          ))}
        </section>
        {/* Recent Orders Table */}
        <section className="p-8 pt-0">
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <h3 className="font-semibold text-lg mb-5 text-gray-900 tracking-tight">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs font-semibold border-b">
                    <th className="px-4 py-2 text-left">ORDER ID</th>
                    <th className="px-4 py-2 text-left">CUSTOMER</th>
                    <th className="px-4 py-2 text-left">AMOUNT</th>
                    <th className="px-4 py-2 text-left">STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {RECENT_ORDERS.map((order, idx) => (
                    <tr
                      key={order.id}
                      className={`border-b last:border-0`}
                    >
                      <td className="px-4 py-3 font-medium">{order.id}</td>
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3">{order.amount}</td>
                      <td className="px-4 py-3">
                        <span className={
                          "px-3 py-1.5 rounded-full text-xs font-semibold " +
                          (STATUS_STYLES[order.status] || "bg-gray-200 text-gray-600")}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
