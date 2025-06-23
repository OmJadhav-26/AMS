import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResidentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resident, setResident] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/residents/${id}`)
      .then(res => {
        setResident(res.data);
        setFormData(res.data);
      })
      .catch(err => {
        console.error("Error fetching resident:", err);
        setStatusMessage("Failed to fetch resident details.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/residents/${id}`, formData);
      setStatusMessage("Resident updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating resident:", error);
      setStatusMessage("Failed to update resident.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this resident?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/residents/${id}`);
      navigate('/residents');
    } catch (error) {
      console.error("Error deleting resident:", error);
      setStatusMessage("Failed to delete resident.");
    }
  };

  if (!resident) {
    return <div className="text-center mt-10 text-red-500">{statusMessage || "Loading..."}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Resident Details</h1>

      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Full Name", name: "fullName" },
            { label: "Contact", name: "contact" },
            { label: "Flat Number", name: "flatNumber" },
            { label: "Total Rooms", name: "totalRooms", type: "number" },
            { label: "Wing", name: "wing" },
            { label: "Ownership", name: "ownership" },
            { label: "2 Wheelers", name: "twoWheelers", type: "number" },
            { label: "4 Wheelers", name: "fourWheelers", type: "number" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm mb-1">{label}</label>
              <input
                type={type || 'text'}
                name={name}
                value={formData[name]}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              />
            </div>
          ))}

          <div className="col-span-2">
            <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                name="hasVehicle"
                checked={formData.hasVehicle}
                disabled={!editMode}
                onChange={handleChange}
                className="mr-2"
              />
              Has Vehicle
            </label>
          </div>
        </div>

        {statusMessage && (
          <div className="text-center text-sm mt-4 text-yellow-400">{statusMessage}</div>
        )}

        <div className="mt-6 flex justify-between">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setFormData(resident); // Reset changes
                }}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResidentDetails;
