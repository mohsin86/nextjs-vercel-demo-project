import Navigation from '@/components/navigationFrontEnd';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVIGATION */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto p-4">
          <Navigation />
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">

        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
          Build Modern Web Apps  
          <span className="text-blue-600"> with Next.js</span>
        </h1>

        <p className="mt-6 text-gray-600 text-lg max-w-2xl">
          A simple demo project with authentication, forms, dashboard,
          and user management using Next.js App Router and Tailwind CSS.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex gap-4">
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </a>

          <a
            href="/about"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow border hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">Authentication</h3>
          <p className="text-gray-600">
            Login system with role-based access (admin/user).
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">Forms</h3>
          <p className="text-gray-600">
            Advanced form handling with validation and server actions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
          <p className="text-gray-600">
            Clean admin dashboard with stats and navigation.
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} Demo Project — Built with Next.js
      </footer>

    </div>
  );
}