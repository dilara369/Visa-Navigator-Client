import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
const VisaDetails = () => {
  const visa = useLoaderData();
    const { user } = useContext(AuthContext);
    const userEmail = user?.email || "";

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: userEmail,
    firstName: "",
    lastName: "",
    appliedDate: new Date().toISOString().split("T")[0],
    fee: visa.fee,
  });

  // Handle input changes in the modal form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentAppliedDate = new Date().toISOString();

    const updatedData = {
      ...formData,
      appliedDate: currentAppliedDate,
    };

    const response = await fetch(
      `http://localhost:4800/visa-details/${visa._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (response.ok) {
      // Using SweetAlert2 for success
      Swal.fire({
        title: "Success!",
        text: "Visa Application successful.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setShowModal(false); // Close the modal after success
    } else {
      // Using SweetAlert2 for error
      Swal.fire({
        title: "Error!",
        text: "Failed to apply for Visa.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6  dark:text-gray-200">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 animate__animated animate__fadeIn">
        Visa Details
      </h2>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden pb-2 dark:bg-gray-900 dark:text-gray-200">
        {/* Visa Details Card */}
        <div className="grid justify-center items-center">
          <img
            src={visa.Country_image}
            alt={`${visa.Country_name} flag`}
            className="h-72 object-cover rounded-lg mt-4"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">{visa.Country_name}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Visa Type:</strong> {visa.Visa_type}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Age Restriction:</strong>{" "}
            {visa.ageRestriction ? `${visa.ageRestriction}+` : "None"}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Fee:</strong> ${visa.Fee}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Validity:</strong> {visa.Validity}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Processing Time:</strong> {visa.Processing_time}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Required Documents:</strong>{" "}
            {visa.requiredDocuments?.join(", ") || "None"}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Application Method:</strong> {visa.Application_method}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Description:</strong> {visa.Description}
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            onClick={() => setShowModal(true)}
          >
            Apply for the Visa
          </button>
        </div>
      </div>

      {/* Modal for Visa Application */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative dark:bg-gray-800">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-400 text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Apply for {visa.Country_name}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Applied Date
                </label>
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Fee
                </label>
                <input
                  type="text"
                  name="fee"
                  value={formData.fee}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails;
