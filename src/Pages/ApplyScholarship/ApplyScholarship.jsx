import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function ApplyScholarship() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [applicationData, setApplicationData] = useState({
    phone: '',
    applicantPhoto: '',
    village: '',
    district: '',
    country: '',
    gender: '',
    applyingDegree: '',
    sscResult: '',
    hscResult: '',
    studyGap: '',
    // Payment fields
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    zipCode: ''
  });

  useEffect(() => {
    // Fetch scholarship details
    const fetchScholarship = async () => {
      try {
        const response = await fetch(`https://schoolarship-management-system-serv.vercel.app/scholarships/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch scholarship');
        }
        const data = await response.json();
        setScholarship(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load scholarship details');
        navigate('/scholarships');
      }
    };

    fetchScholarship();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number (16 digits with spaces)
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry date (MM/YY - 4 digits)
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + ' / ' + formattedValue.slice(2);
      }
    }
    
    // Format CVC (3-4 digits)
    if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    // Format ZIP (5-10 digits/letters)
    if (name === 'zipCode') {
      formattedValue = value.slice(0, 10);
    }

    setApplicationData((prev) => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!applicationData.phone || !applicationData.applicantPhoto || !applicationData.gender || 
        !applicationData.applyingDegree || !applicationData.sscResult || !applicationData.hscResult ||
        !applicationData.village || !applicationData.district || !applicationData.country ||
        !applicationData.cardNumber || !applicationData.expiryDate || 
        !applicationData.cvc || !applicationData.zipCode) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      // Fetch user data
      const userResponse = await fetch(`https://schoolarship-management-system-serv.vercel.app/users/${user.email}`);
      const userData = await userResponse.json();

      // Prepare application data
      const completeApplicationData = {
        // Form data
        phone: applicationData.phone,
        applicantPhoto: applicationData.applicantPhoto,
        address: {
          village: applicationData.village,
          district: applicationData.district,
          country: applicationData.country
        },
        gender: applicationData.gender,
        applyingDegree: applicationData.applyingDegree,
        sscResult: parseFloat(applicationData.sscResult),
        hscResult: parseFloat(applicationData.hscResult),
        studyGap: applicationData.studyGap || 'No gap',
        
        // Payment information
        paymentInfo: {
          cardNumber: applicationData.cardNumber,
          expiryDate: applicationData.expiryDate,
          cvc: applicationData.cvc,
          zipCode: applicationData.zipCode,
          amount: scholarship.application_fees
        },
        
        // Scholarship details
        universityName: scholarship.university_name,
        scholarshipCategory: scholarship.scholarship_category,
        subjectCategory: scholarship.subject_category,
        
        // User information
        userName: user.displayName || user.email,
        userEmail: user.email,
        userId: userData._id,
        
        // Scholarship ID
        scholarshipId: scholarship._id,
        scholarshipName: scholarship.scholarship_name,
        
        // Application metadata
        applicationDate: new Date().toISOString(),
        status: 'pending',
        applicationFee: scholarship.application_fees,
        paymentStatus: 'completed'
      };

      // Save to database
      const response = await fetch('https://schoolarship-management-system-serv.vercel.app/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeApplicationData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result = await response.json();
      console.log('Application submitted successfully:', result);

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted Successfully!',
        text: 'Your scholarship application and payment have been submitted. Admin will review it shortly.',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'View My Applications'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/user-dashboard/my-applications');
        } else {
          navigate('/scholarships');
        }
      });

    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">Scholarship not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Apply for Scholarship</h1>
            <p className="text-blue-100 mt-2">{scholarship.scholarship_name}</p>
          </div>

          {/* Scholarship Info */}
          <div className="bg-blue-50 px-8 py-6 border-b border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">University</p>
                <p className="font-semibold text-gray-800">{scholarship.university_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Scholarship Category</p>
                <p className="font-semibold text-gray-800">{scholarship.scholarship_category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Subject Category</p>
                <p className="font-semibold text-gray-800">{scholarship.subject_category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Application Fee</p>
                <p className="font-semibold text-green-600 text-xl">${scholarship.application_fees}</p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Application Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Applicant's Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={applicationData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Applicant Photo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applicant Photo URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="applicantPhoto"
                  value={applicationData.applicantPhoto}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter photo URL"
                  required
                />
              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Village <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="village"
                    value={applicationData.village}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Village"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={applicationData.district}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="District"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={applicationData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Country"
                    required
                  />
                </div>
              </div>

              {/* Gender Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={applicationData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Applying Degree Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applying Degree <span className="text-red-500">*</span>
                </label>
                <select
                  name="applyingDegree"
                  value={applicationData.applyingDegree}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Degree</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>
              </div>

              {/* Academic Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SSC Result (GPA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="sscResult"
                    value={applicationData.sscResult}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 5.00"
                    min="0"
                    max="5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    HSC Result (GPA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="hscResult"
                    value={applicationData.hscResult}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 5.00"
                    min="0"
                    max="5"
                    required
                  />
                </div>
              </div>

              {/* Study Gap (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Study Gap (Optional)
                </label>
                <select
                  name="studyGap"
                  value={applicationData.studyGap}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">No Study Gap</option>
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                  <option value="3 years">3 years</option>
                  <option value="More than 3 years">More than 3 years</option>
                </select>
              </div>

              {/* Read-only Fields */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Scholarship Details (Read-only)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">University Name</label>
                    <input
                      type="text"
                      value={scholarship.university_name}
                      readOnly
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Scholarship Category</label>
                    <input
                      type="text"
                      value={scholarship.scholarship_category}
                      readOnly
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Subject Category</label>
                    <input
                      type="text"
                      value={scholarship.subject_category}
                      readOnly
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Application Deadline</label>
                    <input
                      type="text"
                      value={new Date(scholarship.application_deadline).toLocaleDateString()}
                      readOnly
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Purchase</h3>
                <p className="text-gray-600 mb-2">Application Fee: ${scholarship.application_fees}</p>
                <p className="text-2xl font-bold text-gray-900 mb-6">Total: ${scholarship.application_fees}</p>

                {/* Payment Suggestion */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Test Card Details:</strong> Use <span className="font-mono font-bold">4242 4242 4242 4242</span> for card number, 
                    <span className="font-mono font-bold"> 12/34</span> for expiry, <span className="font-mono font-bold">123</span> for CVC
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm space-y-4">
                  {/* Card Number */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                          <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="cardNumber"
                        value={applicationData.cardNumber}
                        onChange={handleInputChange}
                        maxLength="19"
                        className="w-full pl-14 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        placeholder="Card number (e.g., 4242 4242 4242 4242)"
                        required
                      />
                    </div>
                  </div>

                  {/* Expiry, CVC, and ZIP in one row */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* MM / YY */}
                    <div>
                      <input
                        type="text"
                        name="expiryDate"
                        value={applicationData.expiryDate}
                        onChange={handleInputChange}
                        maxLength="7"
                        className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-center"
                        placeholder="MM / YY"
                        required
                      />
                    </div>

                    {/* CVC */}
                    <div>
                      <input
                        type="text"
                        name="cvc"
                        value={applicationData.cvc}
                        onChange={handleInputChange}
                        maxLength="4"
                        className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-center"
                        placeholder="CVC"
                        required
                      />
                    </div>

                    {/* ZIP */}
                    <div>
                      <input
                        type="text"
                        name="zipCode"
                        value={applicationData.zipCode}
                        onChange={handleInputChange}
                        maxLength="10"
                        className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-center"
                        placeholder="ZIP"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-white text-xl transition-all duration-200 ${
                    submitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                      Processing...
                    </div>
                  ) : (
                    `Pay $${scholarship.application_fees}`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
