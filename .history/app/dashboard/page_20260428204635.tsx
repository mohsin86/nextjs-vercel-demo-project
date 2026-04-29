import Navigation from '@/components/Navigation';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          My Dashboard
        </h2>

        <nav className="flex flex-col gap-4 text-gray-700">
          <a href="/dashboard" className="hover:text-blue-600">
            Overview
          </a>
          <a href="/contacts" className="hover:text-blue-600">
            Contacts Form
          </a>
          <a href="/about" className="hover:text-blue-600">
            About
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* TOP NAV */}
        <div className="bg-white border-b p-4">
          <Navigation />
        </div>

        {/* CONTENT */}
        <main className="p-6">

          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Dashboard Overview
          </h1>

          {/* STATS CARDS */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="text-gray-500">Total Users</h3>
              <p className="text-3xl font-bold">1,240</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="text-gray-500">Form Submissions</h3>
              <p className="text-3xl font-bold">312</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="text-gray-500">Active Sessions</h3>
              <p className="text-3xl font-bold">89</p>
            </div>

          </div>

          {/* TABLE SECTION */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow border">

            <h2 className="text-xl font-semibold mb-4">
              Recent Form Submissions
            </h2>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Job Type</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="p-2">John Doe</td>
                  <td className="p-2">john@example.com</td>
                  <td className="p-2">Developer</td>
                </tr>

                <tr className="border-b">
                  <td className="p-2">Sarah Smith</td>
                  <td className="p-2">sarah@example.com</td>
                  <td className="p-2">Designer</td>
                </tr>
              </tbody>
            </table>

          </div>

        </main>
      </div>
    </div>
  );
}