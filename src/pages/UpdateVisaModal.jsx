import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const UpdateVisaModal = ({ selectedVisa, setShowModal, handleUpdate }) => {
  const [formData, setFormData] = useState(selectedVisa || {});
  const checkboxesRef = useRef([]);

  // Whenever selectedVisa changes, update formData
  useEffect(() => {
    setFormData(selectedVisa);
  }, [selectedVisa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      requiredDocuments: checked
        ? [...(prev.requiredDocuments || []), value]
        : prev.requiredDocuments.filter((doc) => doc !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 md:w-[40%] max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          Update Visa
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Fields for visa details */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Country Name
            </label>
            <input
              type="text"
              name="countryName"
              value={formData.countryName}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Enter Country Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Country Image URL
            </label>
            <input
              type="text"
              name="countryImage"
              value={formData.countryImage}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Enter Image URL"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Visa Type
            </label>
            <select
              name="visaType"
              value={formData.visaType}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Processing Time
            </label>
            <input
              type="text"
              name="processingTime"
              value={formData.processingTime}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Enter Processing Time"
              required
            />
          </div>

          {/* Required Documents */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Required Documents
            </label>
            <div>
              {[
                "Valid Passport",
                "Visa Application Form",
                "ID Card",
                "Recent Photograph",
              ].map((doc, index) => (
                <label className="inline-flex items-center mr-4" key={doc}>
                  <input
                    type="checkbox"
                    value={doc}
                    onChange={handleCheckboxChange}
                    ref={(el) => (checkboxesRef.current[index] = el)} // Add ref
                    checked={formData.requiredDocuments?.includes(doc)} // Set default checked
                    className="dark:bg-gray-800"
                  />
                  <span className="ml-2 text-gray-900 dark:text-gray-200">
                    {doc}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Enter Visa Description"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Age Restriction
            </label>
            <input
              type="number"
              name="ageRestriction"
              value={formData.ageRestriction}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Enter Age Restriction"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Fee
            </label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Enter Visa Fee"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Validity
            </label>
            <input
              type="text"
              name="validity"
              value={formData.validity}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Enter Visa Validity"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Application Method
            </label>
            <input
              type="text"
              name="applicationMethod"
              value={formData.applicationMethod}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Enter Application Method"
              required
            />
          </div>

          {/* Modal Actions */}
          <div className="flex justify-center gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 px-4 rounded"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-300 text-gray-700 p-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UpdateVisaModal.propTypes = {
  selectedVisa: PropTypes.object.isRequired,
  setShowModal: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default UpdateVisaModal;
