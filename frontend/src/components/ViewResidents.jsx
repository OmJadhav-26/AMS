import React, { useEffect, useState } from 'react';

function ViewResident() {
  const [residents, setResidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/api/residents')
      .then((res) => res.json())
      .then((data) => setResidents(data))
      .catch((err) => console.error('Error fetching residents:', err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this resident?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/residents/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setResidents((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error("Error deleting resident:", err);
    }
  };

  const filteredResidents = residents.filter((r) =>
    r.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Resident List</h1>

      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 p-2 w-full rounded bg-gray-800 text-white border border-gray-600"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Flat No</th>
              <th className="px-4 py-2">Wing</th>
              <th className="px-4 py-2">Rooms</th>
              <th className="px-4 py-2">Owner/Renter</th>
              <th className="px-4 py-2">Has Vehicle</th>
              <th className="px-4 py-2">2W</th>
              <th className="px-4 py-2">4W</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResidents.map((res) => (
              <tr key={res._id} className="border-t border-gray-700">
                <td className="px-4 py-2">{res.fullName}</td>
                <td className="px-4 py-2">{res.contact}</td>
                <td className="px-4 py-2">{res.flatNumber}</td>
                <td className="px-4 py-2">{res.wing}</td>
                <td className="px-4 py-2">{res.totalRooms}</td>
                <td className="px-4 py-2">{res.ownerOrRenter}</td>
                <td className="px-4 py-2">{res.hasVehicle ? "Yes" : "No"}</td>
                <td className="px-4 py-2">{res.twoWheelers || 0}</td>
                <td className="px-4 py-2">{res.fourWheelers || 0}</td>
                <td className="px-4 py-2 space-x-2">
                  {/* Keep your Edit button logic here if needed */}
                  <button onClick={() => handleDelete(res._id)}className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewResident;
