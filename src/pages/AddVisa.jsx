import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

export default function AddVisa() {
  const { user } = useContext(AuthContext);

  const handlePost = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const visaData = Object.fromEntries(formData.entries());

    // Validate required fields
    if (
      !visaData.countryName ||
      !visaData.countryImage ||
      !visaData.visaType ||
      !visaData.processingTime ||
      !visaData.description
    ) {
      alert('Please fill out all required fields!');
      return;
    }

    // Submit data to the server
    fetch('https://visa-navigator-server-cyan.vercel.app/add-visa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visaData),
    })
      .then(() => e.target.reset())
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-3xl mx-auto bg-blue-50 dark:bg-gray-900 p-8 rounded-lg shadow-lg my-12">
      <h2 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-300 mb-8">
        Add a Visa
      </h2>

      <form onSubmit={handlePost} className="space-y-6">
        {/* Country Name */}
        <div>
          <label className="block text-lg font-medium text-blue-700 dark:text-blue-400 mb-2">
            Country Name
          </label>
          <input
            type="text"
            name="countryName"
            className="w-full border-2 border-blue-300 dark:border-blue-600 bg-white dark:bg-blue-800 text-blue-700 dark:text-blue-200 p-3 rounded-lg"
            required
          />
        </div>

        {/* Country Image */}
        <div>
          <label className="block text-lg font-medium text-blue-700 dark:text-blue-400 mb-2">
            Country Image URL
          </label>
          <input
            type="url"
            name="countryImage"
            className="w-full border-2 border-blue-300 dark:border-blue-600 bg-white dark:bg-blue-800 text-blue-700 dark:text-blue-200 p-3 rounded-lg"
            required
          />
        </div>

        {/* Visa Type */}
        <div>
          <label className="block text-lg font-medium text-blue-700 dark:text-blue-400 mb-2">
            Visa Type
          </label>
          <select
            name="visaType"
            className="w-full border-2 border-blue-300 dark:border-blue-600 bg-white dark:bg-blue-800 text-blue-700 dark:text-blue-200 p-3 rounded-lg"
            required
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

        {/* Processing Time */}
        <div>
          <label className="block text-lg font-medium text-blue-700 dark:text-blue-400 mb-2">
            Processing Time
          </label>
          <input
            type="text"
            name="processingTime"
            className="w-full border-2 border-blue-300 dark:border-blue-600 bg-white dark:bg-blue-800 text-blue-700 dark:text-blue-200 p-3 rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium text-blue-700 dark:text-blue-400 mb-2">
            Description
          </label>
          <textarea
            name="description"
            className="w-full border-2 border-blue-300 dark:border-blue-600 bg-white dark:bg-blue-800 text-blue-700 dark:text-blue-200 p-3 rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>
        {/* Adder Name */}
        <div>
          <label className="block text-lg font-medium text-blue-700 dark:text-blue-400 mb-2">
            Adder Name
          </label>
          <input
            type="text"
            name="visaCreatorName"
            className="w-full border-2 border-blue-300 dark:border-blue-600 bg-gray-100 text-blue-700 dark:text-blue-200 p-3 rounded-lg"
            required
          />
        </div>

        {/* Adder Email */}
        <div>
          <label className="block text-lg font-medium text-blue-700 dark:text-blue-400 mb-2">
            Adder Email
          </label>
          <input
            type="email"
            name="visaCreatorEmail"
            defaultValue={user?.email}
            readOnly
            className="w-full border-2 border-blue-300 dark:border-blue-600 bg-gray-100 text-blue-700 dark:text-blue-200 p-3 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full bg-lime-600 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-blue-700"
        >
          Add Visa
        </button>
      </form>
    </div>
  );
}
