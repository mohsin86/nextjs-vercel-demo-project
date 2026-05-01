
import NavigationFronEnd from '@/components/navigationFrontEnd';


export const metadata = {
  title: 'About Us - My Website',
  description: 'About our company and team',
  keywords: ['about us', 'company', 'team'],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVIGATION */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto p-4">
          <NavigationFronEnd />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          About Us
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          This is a simple demo project built with Next.js App Router and Tailwind CSS.
          It includes authentication, forms, dashboard UI, and role-based navigation.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          The goal of this project is to practice real-world frontend architecture,
          including reusable components, middleware, and server actions.
        </p>

        {/* HIGHLIGHTS */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white border rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Modern Stack</h3>
            <p className="text-gray-600 text-sm">
              Next.js App Router + Tailwind CSS
            </p>
          </div>

          <div className="bg-white border rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Authentication</h3>
            <p className="text-gray-600 text-sm">
              JWT-based login with role system
            </p>
          </div>

          <div className="bg-white border rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Dashboard</h3>
            <p className="text-gray-600 text-sm">
              Admin and user profile separation
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}