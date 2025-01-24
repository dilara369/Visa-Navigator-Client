import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-100 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 text-gray-800 dark:text-gray-200 py-10 mt-10">
     <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
  {/* Brand and Description */}
  <div className="text-center md:text-left">
    <h2 className="text-3xl font-extrabold mb-4 text-purple-600 dark:text-purple-300">
      Visa Navigator
    </h2>
    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
      We simplify your visa applications, making the process seamless and stress-free.
    </p>
    <div className="flex justify-center md:justify-start space-x-4 mt-6">
      {[
        { icon: FaFacebook, href: "#" },
        { icon: FaSquareXTwitter, href: "#" },
        { icon: FaInstagramSquare, href: "#" },
        { icon: FaYoutube, href: "#" },
      ].map(({ icon: Icon, href }, idx) => (
        <a
          key={idx}
          href={href}
          className="p-2 text-gray-700 dark:text-gray-300 hover:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-600 rounded-full transition-all duration-300"
        >
          <Icon className="text-2xl" />
        </a>
      ))}
    </div>
  </div>

  {/* Stay Connected */}
  <div className="text-center md:text-right">
    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
      Stay Connected
    </h3>
    <form className="grid space-y-3">
      <input
        type="email"
        placeholder="Your Email Address"
        className="px-4 py-2 text-gray-800 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500"
      />
      <button
        type="submit"
        className="px-5 py-2 text-white text-center font-bold rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg transition-transform transform hover:-translate-y-1"
      >
        Subscribe
      </button>
    </form>
  </div>
</div>

      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          Copyright © {new Date().getFullYear()}. <b className="text-purple-600 dark:text-purple-300">Visa Navigator</b>. All rights reserved.
        </p>
        <p className="mt-2">
          Crafted with 💜 by <a href="#" className="hover:underline text-purple-500">Your Team</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
