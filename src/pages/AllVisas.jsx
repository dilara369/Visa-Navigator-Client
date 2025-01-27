import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading"; 
import { Fade } from "react-awesome-reveal"; 

const AllVisas = () => {
  // State for managing loading and visa types
  const [loading, setLoading] = useState(true);
  const [selectedVisaType, setSelectedVisaType] = useState(""); 
  const loadedAllVisas = useLoaderData();
  const [allVisas, setAllVisas] = useState([]);
 
  // Effect to set all visas after data is loaded
  useEffect(() => {
    setTimeout(() => {
      setAllVisas(loadedAllVisas);
      console.log(setAllVisas)
      setLoading(false); 
    }, 100); 
  }, [loadedAllVisas]);

  // Handle the filter change
  const handleFilterChange = (e) => {
    setSelectedVisaType(e.target.value);
  };
  // Filter the visas based on selected visa type
  const filteredVisas = selectedVisaType
  ? allVisas.filter((visa) =>
      visa.Visa_type?.toLowerCase() === selectedVisaType.toLowerCase()
    )
  : allVisas;

    
  return (
    <div className="w-11/12 mx-auto p-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        All Visas
      </h2>
      <div className="mb-8 flex justify-center">
        <select
          value={selectedVisaType}
          onChange={handleFilterChange}
          className="p-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
        >
          <option value="" disabled>
            Select Visa Type
          </option>
          <option value="Tourist Visa">Tourist Visa</option>
          <option value="Student Visa">Student Visa</option>
          <option value="Official Visa">Official Visa</option>
          <option value="Work Visa">Work Visa</option>
        </select>
      </div>

      {loading ? (
        // Show the Loading component when loading
        <div className="flex justify-center items-center h-40">
          <Loading />
        </div>
      ) : filteredVisas.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No visas available for the selected type.
        </p>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredVisas.map((visa) => (
            <Fade key={visa._id} duration={500} triggerOnce>
              {" "}
              {/* Animation for each visa card */}
              <div className="bg-white border dark:border-gray-700 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 duration-300">
                <img
                  src={visa.Country_image}
                  alt={visa.Country_name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {visa.Country_name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <strong>Visa Type:</strong> {visa.Visa_type}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <strong>Fee:</strong> ${visa.Fee}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Validity:</strong> {visa.Validity}
                  </p>
                  <Link
                    to={`/visa-details/${visa._id}`}
                    className="inline-block bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVisas;
