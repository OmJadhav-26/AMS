import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResidentList = () => {
  const [residents, setResidents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/residents");
      setResidents(response.data);
    } catch (error) {
      console.error("Failed to fetch residents:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/residents/${id}`);
      fetchResidents();
    } catch (error) {
      console.error("Failed to delete resident:", error);
    }
  };

  const filteredResidents = residents.filter((resident) =>
    resident.fullName.toLowerCase().includes(searchName.toLowerCase())
  );

  const indexOfLast = currentPage * residentsPerPage;
  const indexOfFirst = indexOfLast - residentsPerPage;
  const currentResidents = filteredResidents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredResidents.length / residentsPerPage);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Resident List</h2>

      <input
        type="text"
        placeholder="Search by name"
        className="w-full px-3 py-2 mb-4 rounded bg-gray-800 text-white text-center"
        value={searchName}
        onChange={(e) => {
          setSearchName(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden text-center">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="py-2 px-4">Full Name</th>
              <th className="py-2 px-4">Contact</th>
              <th className="py-2 px-4">Flat No</th>
              <th className="py-2 px-4">Total Rooms</th>
              <th className="py-2 px-4">Wing</th>
              <th className="py-2 px-4">Owner/Renter</th>
              <th className="py-2 px-4">2W</th>
              <th className="py-2 px-4">4W</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentResidents.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No residents found.
                </td>
              </tr>
            ) : (
              currentResidents.map((resident) => (
                <tr key={resident._id} className="border-b border-gray-600">
                  <td className="py-2 px-4">{resident.fullName}</td>
                  <td className="py-2 px-4">{resident.contact}</td>
                  <td className="py-2 px-4">{resident.flatNumber}</td>
                  <td className="py-2 px-4">{resident.totalRooms}</td>
                  <td className="py-2 px-4">{resident.wing}</td>
                  <td className="py-2 px-4">{resident.ownership}</td>
                  <td className="py-2 px-4">{resident.twoWheelers}</td>
                  <td className="py-2 px-4">{resident.fourWheelers}</td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => navigate(`/residents/${resident._id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(resident._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${currentPage === index + 1
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-gray-600"
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResidentList;
