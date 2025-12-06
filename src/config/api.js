// API Configuration
export const API_BASE_URL = 'https://schoolarship-management-system-serv.vercel.app';

// API Endpoints
export const API_ENDPOINTS = {
  // User endpoints
  users: `${API_BASE_URL}/users`,
  userByEmail: (email) => `${API_BASE_URL}/users/${email}`,
  checkAdmin: (email) => `${API_BASE_URL}/users/admin/${email}`,
  checkModerator: (email) => `${API_BASE_URL}/users/moderator/${email}`,
  requestModerator: (email) => `${API_BASE_URL}/users/request-moderator/${email}`,
  updateUserRole: (email) => `${API_BASE_URL}/users/role/${email}`,
  deleteUser: (email) => `${API_BASE_URL}/users/${email}`,
  
  // Scholarship endpoints
  scholarships: `${API_BASE_URL}/scholarships`,
  topScholarships: `${API_BASE_URL}/scholarships/top`,
  scholarshipById: (id) => `${API_BASE_URL}/scholarships/${id}`,
  
  // Application endpoints
  applications: `${API_BASE_URL}/applications`,
  applicationsByUser: (email) => `${API_BASE_URL}/applications/user/${email}`,
  applicationById: (id) => `${API_BASE_URL}/applications/${id}`,
  
  // Review endpoints
  reviews: `${API_BASE_URL}/reviews`,
  reviewsByUser: (email) => `${API_BASE_URL}/reviews/user/${email}`,
  reviewsByScholarship: (id) => `${API_BASE_URL}/reviews/scholarship/${id}`,
  reviewById: (id) => `${API_BASE_URL}/reviews/${id}`,
  
  // Payment endpoints
  createPaymentIntent: `${API_BASE_URL}/create-payment-intent`
};
