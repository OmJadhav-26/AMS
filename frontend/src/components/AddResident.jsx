import React, { useState } from 'react';
import axios from 'axios';

const AddResident = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    flatNumber: '',
    totalRooms: '',
    wing: '',
    ownership: 'owner',
    hasVehicle: false,
    twoWheelers: 0,
    fourWheelers: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/residents', formData);
      alert('Resident added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error: Failed to save resident data', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Add Resident</h2>

        <div className="mb-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="flatNumber"
            placeholder="Flat Number"
            value={formData.flatNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">Total Rooms</label>
          <select
            name="totalRooms"
            value={formData.totalRooms}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          >
            <option value="">Select rooms</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="5+">5+</option>
          </select>
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="wing"
            placeholder="Wing"
            value={formData.wing}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <select
            name="ownership"
            value={formData.ownership}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            required
          >
            <option value="owner">Owner</option>
            <option value="renter">Renter</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center text-white">
            <input
              type="checkbox"
              name="hasVehicle"
              checked={formData.hasVehicle}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Has Vehicle
          </label>
        </div>

        {formData.hasVehicle && (
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-1">2 Wheelers</label>
              <input
                type="number"
                name="twoWheelers"
                value={formData.twoWheelers}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
              />
            </div>
            <div>
              <label className="block text-white mb-1">4 Wheelers</label>
              <input
                type="number"
                name="fourWheelers"
                value={formData.fourWheelers}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddResident;
