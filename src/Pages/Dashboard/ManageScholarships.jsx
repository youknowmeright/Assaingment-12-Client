import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export default function ManageScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = () => {
    fetch('https://schoolarship-management-system-serv.vercel.app/scholarships')
      .then(res => res.json())
      .then(data => {
        setScholarships(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching scholarships:', err);
        toast.error('Failed to load scholarships');
        setLoading(false);
      });
  };

  const handleEditClick = (scholarship) => {
    setEditingScholarship(scholarship);
    setEditFormData({
      scholarship_name: scholarship.scholarship_name || '',
      university_name: scholarship.university_name || '',
      university_image: scholarship.university_image || '',
      location: {
        country: scholarship.location?.country || '',
        city: scholarship.location?.city || ''
      },
      world_rank: scholarship.world_rank || '',
      subject_name: scholarship.subject_name || '',
      scholarship_category: scholarship.scholarship_category || '',
      degree: scholarship.degree || '',
      tuition_fees: scholarship.tuition_fees || '',
      application_fees: scholarship.application_fees || '',
      service_charge: scholarship.service_charge || '',
      application_deadline: scholarship.application_deadline || '',
      scholarship_post_date: scholarship.scholarship_post_date || ''
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    fetch(`https://schoolarship-management-system-serv.vercel.app/scholarships/${editingScholarship._id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(editFormData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Scholarship updated successfully!',
            icon: 'success',
            confirmButtonColor: '#8B5CF6'
          });
          setShowEditModal(false);
          setEditingScholarship(null);
          fetchScholarships();
        }
      })
      .catch(err => {
        console.error('Error updating scholarship:', err);
        toast.error('Failed to update scholarship');
      });
  };

  const handleDeleteScholarship = (scholarshipId, scholarshipName) => {
    Swal.fire({
      title: 'Delete Scholarship?',
      text: `Are you sure you want to delete "${scholarshipName}"? This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://schoolarship-management-system-serv.vercel.app/scholarships/${scholarshipId}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              toast.success('🗑️ Scholarship deleted successfully!');
              fetchScholarships();
            }
          })
          .catch(err => {
            console.error('Error deleting scholarship:', err);
            toast.error('Failed to delete scholarship');
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading scholarships...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg className="w-7 h-7 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Manage Scholarships
          </h2>
          <span className="text-sm text-gray-600">
            Total: <span className="font-semibold text-purple-600">{scholarships.length}</span>
          </span>
        </div>

        {scholarships.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Scholarships Found</h3>
            <p className="text-gray-600">Add scholarships to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Scholarship Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Subject Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Degree
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Application Fees
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scholarships.map((scholarship) => (
                  <tr key={scholarship._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-gray-900">
                        {scholarship.scholarship_name || scholarship.university_name}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-900">{scholarship.university_name}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {scholarship.subject_name}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {scholarship.scholarship_category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-900 font-semibold">${scholarship.application_fees}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/scholarship/${scholarship._id}`}
                          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          title="View Details"
                        >
                          <FaEye />
                        </Link>
                        <button
                          onClick={() => handleEditClick(scholarship)}
                          className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                          title="Edit Scholarship"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteScholarship(scholarship._id, scholarship.scholarship_name || scholarship.university_name)}
                          className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          title="Delete Scholarship"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-linear-to-r from-purple-600 to-blue-600 p-6 text-white">
              <h3 className="text-2xl font-bold">Edit Scholarship</h3>
              <p className="text-purple-100 mt-1">
                Update scholarship information
              </p>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Scholarship Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editFormData.scholarship_name}
                    onChange={(e) => setEditFormData({...editFormData, scholarship_name: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    University Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editFormData.university_name}
                    onChange={(e) => setEditFormData({...editFormData, university_name: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editFormData.location?.country}
                    onChange={(e) => setEditFormData({...editFormData, location: {...editFormData.location, country: e.target.value}})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editFormData.location?.city}
                    onChange={(e) => setEditFormData({...editFormData, location: {...editFormData.location, city: e.target.value}})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Subject Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editFormData.subject_name}
                    onChange={(e) => setEditFormData({...editFormData, subject_name: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Scholarship Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editFormData.scholarship_category}
                    onChange={(e) => setEditFormData({...editFormData, scholarship_category: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="Full fund">Full fund</option>
                    <option value="Partial">Partial</option>
                    <option value="Self-fund">Self-fund</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Degree <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editFormData.degree}
                    onChange={(e) => setEditFormData({...editFormData, degree: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Application Fees <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={editFormData.application_fees}
                    onChange={(e) => setEditFormData({...editFormData, application_fees: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Application Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={editFormData.application_deadline}
                    onChange={(e) => setEditFormData({...editFormData, application_deadline: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Update Scholarship
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingScholarship(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
