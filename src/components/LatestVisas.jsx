import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal"; 

const LatestVisas = () => {
  const [latestVisas, setLatestVisas] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4800/latest-visas?limit=6")
      .then((res) => res.json())
      .then((data) => setLatestVisas(data))
      .catch((error) => console.error("Error fetching visas:", error));
  }, []);
  return (
    <div className="max-w-7xl mx-auto p-6">
     
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-blue-500 dark:text-gray-200">
        <Typewriter
          words={["Here Is Latest Visas"]}
          loop={1}
          cursor
          cursorStyle=""
          typeSpeed={50}
          deleteSpeed={50}
          delaySpeed={50}
        />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {latestVisas.map((visa) => (
          <Fade key={visa._id} duration={20} triggerOnce>
            {" "}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={visa.Country_name}
                alt={visa.Country_name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 grid h-full">
                <div className="">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {visa.Country_name}
                  </h3>
                  <p className="text-sm text-blue-300 dark:text-blue-400 mb-1">
                    <strong>Visa Type:</strong> {visa.Visa_type}
                  </p>
                  <p className="text-sm text-blue-300 dark:text-blue-400 mb-1">
                    <strong>Processing Time:</strong> {visa.Processing_time}
                  </p>
                  <p className="text-sm text-blue-300 dark:text-blue-400 mb-1">
                    <strong>Fee:</strong> ${visa.Fee}
                  </p>
                  <p className="text-sm text-blue-300 dark:text-blue-400 mb-1">
                    <strong>Validity:</strong> {visa.Validity}
                  </p>
                  <p className="text-sm text-blue-300 dark:text-blue-400 mb-3">
                    <strong>Application Method:</strong>{" "}
                    {visa.Application_method}
                  </p>
                </div>
                <Link
                  to={`/visa-details/${visa._id}`}
                  className="inline-block w-fit bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  See Details
                </Link>
              </div>
            </div>
          </Fade>
        ))}
      </div>

      <div className="text-center mt-8">
        <Fade duration={1000} triggerOnce>
          <Link
            to="/all-visas"
            className="inline-block bg-lime-500 text-white text-lg py-2 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            See All Visas
          </Link>
        </Fade>
      </div>
    </div>
  );
};

export default LatestVisas;
