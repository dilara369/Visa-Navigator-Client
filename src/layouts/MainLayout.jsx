import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-lime-100 dark:from-purple-900 dark:via-gray-800 dark:to-blue-900">
    
        <Navbar />
      {/* </div> */}

      {/* main content  */}
      <main className="flex-grow my-10">
        <div className="container mx-auto px-6">
          <Outlet />
        </div>
      </main>

      {/* footer  */}
      <Footer />
    </div>
  );
}
