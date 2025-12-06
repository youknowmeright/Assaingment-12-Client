import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function AddScholarship() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    scholarship_name: '',
    university_name: '',
    university_image: '',
    location: {
      country: '',
      city: ''
    },
    world_rank: '',
    subject_name: '',
    scholarship_category: '',
    degree: '',
    tuition_fees: '',
    application_fees: '',
    service_charge: '',
    application_deadline: '',
    scholarship_post_date: new Date().toISOString().split('T')[0],
    posted_user_email: user?.email || ''
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setImageUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Upload to imgbb
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          university_image: data.data.display_url
        }));
        toast.success('✅ Image uploaded successfully!');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://schoolarship-management-system-serv.vercel.app/scholarships', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Scholarship added successfully!',
          icon: 'success',
          confirmButtonColor: '#8B5CF6'
        });

        // Reset form
        setFormData({
          scholarship_name: '',
          university_name: '',
          university_image: '',
          location: {
            country: '',
            city: ''
          },
          world_rank: '',
          subject_name: '',
          scholarship_category: '',
          degree: '',
          tuition_fees: '',
          application_fees: '',
          service_charge: '',
          application_deadline: '',
          scholarship_post_date: new Date().toISOString().split('T')[0],
          posted_user_email: user?.email || ''
        });
      }
    } catch (error) {
      console.error('Error adding scholarship:', error);
      toast.error('Failed to add scholarship');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg className="w-7 h-7 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Scholarship
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Scholarship Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.scholarship_name}
                  onChange={(e) => setFormData({...formData, scholarship_name: e.target.value})}
                  required
                  placeholder="e.g., Excellence Scholarship"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  University Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.university_name}
                  onChange={(e) => setFormData({...formData, university_name: e.target.value})}
                  required
                  placeholder="e.g., Harvard University"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* University Image */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">University Image/Logo</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {imageUploading && (
                  <p className="text-sm text-purple-600 mt-2">Uploading image...</p>
                )}
              </div>

              {formData.university_image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img
                    src={formData.university_image}
                    alt="University Logo"
                    className="w-32 h-32 object-cover rounded-lg border-2 border-purple-200"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Location Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location.country}
                  onChange={(e) => setFormData({...formData, location: {...formData.location, country: e.target.value}})}
                  required
                  placeholder="e.g., USA"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => setFormData({...formData, location: {...formData.location, city: e.target.value}})}
                  required
                  placeholder="e.g., Cambridge"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  World Rank <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.world_rank}
                  onChange={(e) => setFormData({...formData, world_rank: e.target.value})}
                  required
                  placeholder="e.g., 1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Subject Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.subject_name}
                  onChange={(e) => setFormData({...formData, subject_name: e.target.value})}
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
                  value={formData.scholarship_category}
                  onChange={(e) => setFormData({...formData, scholarship_category: e.target.value})}
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
                  value={formData.degree}
                  onChange={(e) => setFormData({...formData, degree: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Degree</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tuition Fees (Optional)
                </label>
                <input
                  type="number"
                  value={formData.tuition_fees}
                  onChange={(e) => setFormData({...formData, tuition_fees: e.target.value})}
                  placeholder="e.g., 50000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Application Fees <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.application_fees}
                  onChange={(e) => setFormData({...formData, application_fees: e.target.value})}
                  required
                  placeholder="e.g., 50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Service Charge <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.service_charge}
                  onChange={(e) => setFormData({...formData, service_charge: e.target.value})}
                  required
                  placeholder="e.g., 10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Dates and Posted By */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Important Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Application Deadline <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.application_deadline}
                  onChange={(e) => setFormData({...formData, application_deadline: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Scholarship Post Date
                </label>
                <input
                  type="date"
                  value={formData.scholarship_post_date}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Posted By
                </label>
                <input
                  type="email"
                  value={formData.posted_user_email}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  scholarship_name: '',
                  university_name: '',
                  university_image: '',
                  location: { country: '', city: '' },
                  world_rank: '',
                  subject_name: '',
                  scholarship_category: '',
                  degree: '',
                  tuition_fees: '',
                  application_fees: '',
                  service_charge: '',
                  application_deadline: '',
                  scholarship_post_date: new Date().toISOString().split('T')[0],
                  posted_user_email: user?.email || ''
                });
              }}
              className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={loading || imageUploading || !formData.university_image}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                loading || imageUploading || !formData.university_image
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {loading ? 'Adding Scholarship...' : 'Add Scholarship'}
            </button>
          </div>
        </form>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-blue-600 mr-3 mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-lg font-semibold text-blue-800 mb-2">Important Notes</h4>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Images are uploaded to imgbb and stored as URLs</li>
              <li>• Maximum image size is 5MB</li>
              <li>• All fields marked with * are required</li>
              <li>• Your email will be recorded as the scholarship poster</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
