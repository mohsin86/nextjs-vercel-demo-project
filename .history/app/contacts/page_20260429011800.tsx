import Navigation from '@/components/Navigation';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVIGATION */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto p-4">
          <Navigation />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Contact Us
        </h1>

        <p className="text-gray-600 mb-10">
          Have a question? Send us a message and we’ll get back to you soon.
        </p>

        {/* FORM */}
        <form className="bg-white border rounded-xl shadow p-6 space-y-5">

          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Message */}
          <textarea
            rows={5}
            placeholder="Your Message"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
}