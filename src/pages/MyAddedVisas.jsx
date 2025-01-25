import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import UpdateVisaModal from "./UpdateVisaModal"; // Import the modal component

const MyAddedVisas = () => {
  const { user } = useContext(AuthContext);
  const [myAddedVisas, setMyAddedVisas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState(null);

  useEffect(() => {
    fetch("https://visa-navigator-server-cyan.vercel.app/all-visas")
      .then((response) => response.json())
      .then((data) => {
        // filter visas based on user email
        const filteredVisas = data.filter(
          (visa) => visa.visaCreatorEmail === user?.email
        );
        setMyAddedVisas(filteredVisas);
      });
  }, [user.email]); // when user email changes, update visas

  const handleUpdate = (updatedVisa) => {
    fetch(
      `https://visa-navigator-server-cyan.vercel.app/visa-update/${updatedVisa._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVisa),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setMyAddedVisas((prev) =>
            prev.map((visa) =>
              visa._id === updatedVisa._id ? updatedVisa : visa
            )
          );
          Swal.fire("Success!", "Visa updated successfully!", "success");
          setShowModal(false); // close modal after update
        }
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://visa-navigator-server-cyan.vercel.app/visa-details/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMyAddedVisas((prev) => prev.filter((visa) => visa._id !== id));
              Swal.fire("Deleted!", "Your visa has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-gray-100 transition-all duration-300">
    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 animate__animated animate__fadeIn">
      My Visa Collection
    </h2>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {myAddedVisas.map((visa) => (
        <div
          key={visa._id}
          className="relative bg-white dark:bg-gray-800 shadow-xl rounded-lg p-5 transition-transform transform hover:scale-105 duration-500"
        >
          {/* Country Image */}
          <div className="relative h-40 w-full mb-4">
            <img
              src={visa.Country_image}
              alt={visa.Country_name}
              className="h-full w-full object-cover rounded-md"
            />
            <span className="absolute top-3 right-3 bg-blue-500 text-white text-sm py-1 px-3 rounded-full">
              {visa.Visa_type}
            </span>
          </div>
  
          {/* Content Section */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {visa.Country_name}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm bg-green-500 text-white py-1 px-2 rounded-full">
                Validity: {visa.Validity}
              </span>
              <span className="text-sm bg-purple-500 text-white py-1 px-2 rounded-full">
                Fee: ${visa.Fee}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Processing Time:</strong> {visa.Processing_time}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Application Method:</strong> {visa.Application_method}
            </p>
          </div>
  
          {/* Action Buttons */}
          <div className="mt-5 flex justify-between">
            <button
              className="bg-emerald-500 text-white py-2 px-5 rounded-full hover:bg-emerald-600 transition-all"
              onClick={() => {
                setSelectedVisa(visa);
                setShowModal(true);
              }}
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white py-2 px-5 rounded-full hover:bg-red-600 transition-all"
              onClick={() => handleDelete(visa._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  
    {/* Modal */}
    {showModal && (
      <UpdateVisaModal
        selectedVisa={selectedVisa}
        setShowModal={setShowModal}
        handleUpdate={handleUpdate}
      />
    )}
  </div>
  
  );
};

export default MyAddedVisas;
