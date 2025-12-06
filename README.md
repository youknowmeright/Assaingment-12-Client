# 🎓 Scholarship Management System

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://schoolarship-management-system-fron.vercel.app/)
[![Server](https://img.shields.io/badge/Server-Live-blue)](https://schoolarship-management-system-serv.vercel.app/)

## 🌐 Live Links
- **Live Site:** [https://schoolarship-management-system-fron.vercel.app/](https://schoolarship-management-system-fron.vercel.app/)
- **Server:** [https://schoolarship-management-system-serv.vercel.app/](https://schoolarship-management-system-serv.vercel.app/)



## 📖 Project Overview

The **Scholarship Management System** is a comprehensive platform designed to connect students with scholarship opportunities from universities worldwide. The system provides role-based access for users, moderators, and administrators to manage scholarship applications, reviews, and user accounts efficiently.

---

## ✨ Key Features

### 🔐 User Features
- **Multi-role Authentication** (User/Moderator/Admin) with Firebase
- **Profile Management** with role-based dashboard access
- **Scholarship Search & Filter** by university, subject, degree, location
- **Advanced Sort Functionality** (University, Subject, Deadline, Fee, Service Charge)
- **Application Tracking** with status updates (Pending, Processing, Completed, Rejected)
- **Payment Processing** with secure card payment integration
- **Review System** for scholarships with rating functionality
- **Responsive Design** optimized for all devices

### 👨‍💼 Admin Dashboard
- **User Management** (Create, Update, Delete, Role Assignment)
- **Scholarship Oversight** with CRUD operations
- **Application Monitoring** with detailed view and status control
- **Review Management** with moderation capabilities
- **Statistical Dashboard** with real-time data visualization
- **Moderator Request Approval** system

### 📝 Moderator Dashboard
- **Scholarship Management** (Add, Edit, Delete scholarships)
- **Application Review** with feedback functionality
- **Review Moderation** capabilities
- **Statistical Overview** of managed scholarships

### 🎯 Scholarship Management
- **Detailed Scholarship Listings** with comprehensive information
- **Image Upload Support** for university/scholarship branding
- **Application Deadline Tracking**
- **Fee Structure Display** (Application Fee + Service Charge)
- **Real-time Availability Status**
- **User Reviews & Ratings** with average calculation

### 💳 Application & Payment System
- **Secure Card Payment Form** with validation
- **Application Fee Processing** with service charges
- **Payment History Tracking**
- **Application Status Notifications**
- **Edit/Cancel Application** functionality (before processing)

---

## 🛠️ Tech Stack

### Frontend
- **React.js 19.2.0** - UI Library
- **React Router DOM 7.10.0** - Navigation
- **Tailwind CSS** - Styling Framework
- **DaisyUI** - Component Library
- **Firebase Authentication** - User Authentication
- **SweetAlert2** - Beautiful Alerts
- **React Toastify** - Notifications
- **React Icons** - Icon Library
- **Vite** - Build Tool

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Stripe Integration** - Payment Processing (Optional)
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment Variables

### Deployment
- **Frontend:** Vercel
- **Backend:** Vercel
- **Database:** MongoDB Atlas

---

## 🚀 API Endpoints

### 👤 Authentication & Users
```
POST   /users                          # User registration
GET    /users/:email                   # Get user by email
GET    /users                          # Get all users (Admin)
GET    /users/admin/:email             # Check admin status
GET    /users/moderator/:email         # Check moderator status
PATCH  /users/request-moderator/:email # Request moderator role
PATCH  /users/approve-moderator/:email # Approve moderator (Admin)
GET    /users/moderator-requests       # Get all moderator requests
PATCH  /users/role/:email              # Update user role (Admin)
DELETE /users/:email                   # Delete user (Admin)
```

### 🎓 Scholarships
```
GET    /scholarships                   # Get all scholarships
GET    /scholarships/top               # Get top 6 scholarships
GET    /scholarships/:id               # Get scholarship by ID
POST   /scholarships                   # Create new scholarship (Moderator/Admin)
PATCH  /scholarships/:id               # Update scholarship (Moderator/Admin)
DELETE /scholarships/:id               # Delete scholarship (Moderator/Admin)
```

### 📋 Applications
```
POST   /applications                   # Submit new application
GET    /applications/user/:email       # Get user's applications
GET    /applications                   # Get all applications (Moderator/Admin)
PATCH  /applications/:id               # Update application status
DELETE /applications/:id               # Cancel application
```

### ⭐ Reviews
```
POST   /reviews                        # Create new review
GET    /reviews/user/:email            # Get user's reviews
GET    /reviews/scholarship/:id        # Get reviews by scholarship
GET    /reviews                        # Get all reviews
PATCH  /reviews/:id                    # Update review
DELETE /reviews/:id                    # Delete review
```

### 💰 Payments
```
POST   /create-payment-intent          # Create Stripe payment intent
```



## 🎨 Features Showcase

### 🏠 Home Page
- Hero banner with call-to-action
- Top 6 featured scholarships
- How it works section
- User testimonials
- Responsive navigation

### 🔍 All Scholarships Page
- Search functionality (University, Subject, Location)
- Sort by multiple criteria (Ascending/Descending)
- Scholarship cards with key information
- Pagination support
- Filter by category

### 📄 Scholarship Details
- Complete scholarship information
- University details and location
- Application deadline countdown
- Fee breakdown (Application + Service)
- Real user reviews with ratings
- Review carousel with navigation
- Apply button (Private Route)

### 📝 Application Process
- Multi-step application form
- Personal information collection
- Academic details (SSC, HSC, Study Gap)
- Secure card payment form
- Auto-formatting for card inputs
- Test card suggestions
- Application confirmation

### 👤 User Dashboard
- Profile management
- My Applications (View, Edit, Cancel)
- My Reviews (Add, Edit, Delete)
- Application status tracking
- Moderator request functionality

### 🛡️ Moderator Dashboard
- Add new scholarships
- Manage scholarships (Edit, Delete)
- Review applications
- Provide feedback
- View statistics

### 👑 Admin Dashboard
- Complete user management
- Role assignment (User, Moderator, Admin)
- Approve moderator requests
- Delete users
- Monitor all applications
- Manage all scholarships
- Review oversight
- Comprehensive statistics

---

## 🔒 Security Features

- Firebase Authentication with email/password
- Protected routes with PrivateRoute component
- Role-based access control (RBAC)
- Secure API endpoints
- Input validation and sanitization
- CORS enabled for specific origins

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  photoURL: String,
  role: String, // 'user', 'moderator', 'admin'
  moderatorRequest: Boolean,
  createdAt: Date
}
```

### Scholarships Collection
```javascript
{
  _id: ObjectId,
  university_name: String,
  university_image: String,
  scholarship_category: String,
  subject_name: String,
  scholarship_description: String,
  application_fees: Number,
  service_charge: Number,
  degree: String,
  application_deadline: Date,
  location: {
    country: String,
    city: String
  },
  posted_date: Date,
  createdAt: Date
}
```

### Applications Collection
```javascript
{
  _id: ObjectId,
  scholarshipId: ObjectId,
  scholarshipName: String,
  universityName: String,
  subjectCategory: String,
  applyingDegree: String,
  applicationFee: Number,
  serviceCharge: Number,
  userId: String,
  userName: String,
  userEmail: String,
  phone: String,
  gender: String,
  address: {
    village: String,
    district: String,
    country: String
  },
  sscResult: Number,
  hscResult: Number,
  studyGap: Number,
  applicantPhoto: String,
  paymentInfo: {
    cardNumber: String,
    expiryDate: String,
    cvc: String,
    zipCode: String,
    amount: Number
  },
  status: String, // 'pending', 'processing', 'completed', 'rejected'
  feedback: String,
  applicationDate: Date,
  createdAt: Date
}
```

### Reviews Collection
```javascript
{
  _id: ObjectId,
  scholarship_id: String,
  user_email: String,
  reviewer_name: String,
  reviewer_image: String,
  rating: Number,
  comment: String,
  review_date: Date,
  createdAt: Date
}
```

---


## 👨‍💻 Developer

**Jami40**
- GitHub: [@Jami40](https://github.com/Jami40)
- Project Client: [Scholarship System Frontend](https://github.com/Jami40/Schoolarship_System_Mangement_Client)
- Project Server: [Scholarship System Backend](https://github.com/Jami40/Schoolarship_System_Mangement_Server)

---

## 📞 Contact & Support

For any queries, issues, or support:
- Open an issue on GitHub
- Email: Contact through GitHub profile
- LinkedIn: Available on GitHub profile

---

## 🙏 Acknowledgments

- Firebase for authentication services
- MongoDB Atlas for database hosting
- Vercel for deployment platform
- React.js community for excellent documentation
- All contributors and testers

---

## 📈 Future Enhancements

- [ ] Real-time notifications for application updates
- [ ] Advanced analytics dashboard
- [ ] Email notification system
- [ ] Document upload functionality
- [ ] Multi-language support
- [ ] Mobile application (React Native)
- [ ] AI-powered scholarship recommendations
- [ ] Integration with more payment gateways
- [ ] Scholarship deadline reminders
- [ ] Social media sharing

---

**Made with ❤️ by Jami40**

⭐ Star this repo if you find it helpful!
