import useAuthStore from "../store/authStore";
import toast from "react-hot-toast"; // Import toast

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Handle logout with toast
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  return (
    // 📱 Mobile: stack vertically | 💻 Desktop: sidebar + content side by side
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      
      {/* Sidebar */}
      {/* Full width on mobile (top bar), fixed width on desktop */}
      <aside className="w-full md:w-64 bg-white border-b md:border-r flex flex-col">
        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-3 text-sm font-medium">
            {/* Dashboard menu */}
            <li>
              <span className="flex items-center text-red-500">📊 Dashboard</span>
              <ul className="ml-6 mt-1 space-y-1 text-gray-600">
                <li>Overview</li>
                <li>Your Cards</li>
                <li>Enterprise Info</li>
                <li>Customized DB</li>
              </ul>
            </li>

            {/* Open system */}
            <li>
              <span className="flex items-center mt-4">⚙️ Open system</span>
              <ul className="ml-6 mt-1 space-y-1 text-gray-600">
                <li>Turn-key</li>
                <li>Enterprise</li>
              </ul>
            </li>

            {/* Enterprise */}
            <li className="flex items-center mt-4">🏢 Enterprise</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center px-6 py-4 border-b bg-white gap-4 md:gap-0">
          <h1 className="text-2xl font-bold">
            Welcome, {user?.username || "Guest"}
          </h1>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold">{user?.name || "Rivaan Starling"}</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <img
              src={user?.avatar || "https://i.pravatar.cc/40"}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-red-100 text-red-500 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Body */}
        <section className="flex-1 p-6 overflow-y-auto">
          <p className="text-gray-500">Select a menu item to see details.</p>
        </section>
      </main>
    </div>
  );
}