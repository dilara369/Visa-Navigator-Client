import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const MyApplications = () => {
  const allVisas = useLoaderData();
  const { user } = useContext(AuthContext);

  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  
  useEffect(() => {
    const fetchApplications = () => {
      // Check if user email exists and allVisas is not empty
      if (!user?.email || !allVisas || allVisas.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const filteredApplications = allVisas.filter(
          (visa) =>  visa.visaApplicantEmail === user.email
        );

        setApplications(filteredApplications);
        setFilteredApplications(filteredApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false); // Always stop loading
      }
    };

    fetchApplications();
  }, [allVisas, user?.email]);

  // Handle search functionality
  const handleSearch = () => {
    const filtered = applications.filter((visa) => {
      // Ensure visa.Country_name exists before calling .toLowerCase()
      return visa.Country_name && visa.Country_name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredApplications(filtered);
  };
  

  // Handle cancel application
  const handleCancel = (visaId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://visa-navigator-server-cyan.vercel.app/visa-details/${visaId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ applied_date: null }),
            }
          );

          if (response.ok) {
            setFilteredApplications((prev) =>
              prev.filter((application) => application._id !== visaId)
            );
            Swal.fire(
              "Cancelled!",
              "Your application has been cancelled.",
              "success"
            );
          } else {
            Swal.fire("Error", "Failed to cancel the application.", "error");
          }
        } catch (error) {
          console.error("Error cancelling application:", error);
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
      My Applications
    </h2>
  
    {/* Search Section */}
    <div className="flex justify-center mb-6">
      <input
        type="text"
        className="border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 w-full max-w-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Search by Country"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="ml-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-full hover:opacity-90 transition"
      >
        Search
      </button>
    </div>
    
    {filteredApplications.length === 0 ? (
      <p className="text-center text-gray-500 dark:text-gray-400">No applications found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredApplications.map((visa) => (
          <div
            key={visa._id}
            className="relative group border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-xl transform hover:scale-105 transition duration-300"
          >
            {/* Country Image */}
            <div className="relative">
              <img
                src={visa.Country_image}
                alt={visa.Country_name}
                className="h-40 w-full object-cover rounded-t-3xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 flex items-center justify-center transition-opacity">
                <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition">
                  {visa.Country_name}
                </p>
              </div>
            </div>
  
            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {visa.Country_name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                <strong>Visa Type:</strong> {visa.Visa_type}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                <strong>Processing Time:</strong> {visa.Processing_time}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                <strong>Fee:</strong> ${visa.Fee}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                <strong>Validity:</strong> {visa.Validity}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                <strong>Application Method:</strong> {visa.Application_method}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                <strong>Applied Date:</strong> {new Date(visa.applied_date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                <strong>Applicant:</strong> {visa.first_name + " " + visa.last_name}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                <strong>Email:</strong> {visa.visaApplicantEmail}
              </p>
            </div>
  
            {/* Cancel Button */}
            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={() => handleCancel(visa._id)}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-full shadow-lg hover:opacity-90 transition"
              >
                Cancel Application
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
};

export default MyApplications;
