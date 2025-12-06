import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import HomePage from '../Pages/HomePage/HomePage';
import SignUp from '../SignUp_Login/SignUp';
import Login from '../SignUp_Login/Login';
import NotFound from '../Pages/NotFound/NotFound';
import Schoolarship from '../Pages/SchoolarshipPage/Schoolarship';
import ScholarshipDetails from '../Pages/ScholarshipDetails/ScholarshipDetails';
import ApplyScholarship from '../Pages/ApplyScholarship/ApplyScholarship';
import Dashboard from '../Pages/Dashboard/Dashboard';
import UserDashboard from '../Pages/Dashboard/UserDashboard';
import MyProfile from '../Pages/Dashboard/MyProfile';
import MyApplication from '../Pages/Dashboard/MyApplication';
import MyReviews from '../Pages/Dashboard/MyReviews';
import ModeratorDashboard from '../Pages/Dashboard/ModeratorDashboard';
import ModeratorProfile from '../Pages/Dashboard/ModeratorProfile';
import ManageScholarships from '../Pages/Dashboard/ManageScholarships';
import AllReviews from '../Pages/Dashboard/AllReviews';
import AllAppliedScholarships from '../Pages/Dashboard/AllAppliedScholarships';
import AddScholarship from '../Pages/Dashboard/AddScholarship';
import AdminDashboard from '../Pages/Dashboard/AdminDashboard';
import ManageUsers from '../Pages/Dashboard/ManageUsers';
import AdminProfile from '../Pages/Dashboard/AdminProfile';
import About from '../Pages/About/About';
import Contact from '../Pages/Contact/Contact';
import PrivateRoute from '../routes/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element:<HomePage></HomePage>
        },
        {
            path:'/scholarships',
            element:<Schoolarship></Schoolarship>
        },
        {
            path:'/about',
            element:<About></About>
        },
        {
            path:'/contact',
            element:<Contact></Contact>
        },
        {
            path:'/scholarship/:id',
            element: (
              <PrivateRoute>
                <ScholarshipDetails />
              </PrivateRoute>
            )
        },
        {
            path:'/apply-scholarship/:id',
            element: (
              <PrivateRoute>
                <ApplyScholarship />
              </PrivateRoute>
            )
        },
        {
            path:'/dashboard',
            element: (
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            )
        },
        {
            path:'/user-dashboard',
            element: (
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            ),
            children: [
              {
                index: true,
                element: <Navigate to="/user-dashboard/my-profile" replace />
              },
              {
                path: 'my-profile',
                element: <MyProfile />
              },
              {
                path: 'my-applications',
                element: <MyApplication />
              },
              {
                path: 'my-reviews',
                element: <MyReviews />
              }
            ]
        },
        {
            path:'/moderator-dashboard',
            element: (
              <PrivateRoute>
                <ModeratorDashboard />
              </PrivateRoute>
            ),
            children: [
              {
                index: true,
                element: <Navigate to="/moderator-dashboard/my-profile" replace />
              },
              {
                path: 'my-profile',
                element: <ModeratorProfile />
              },
              {
                path: 'manage-scholarships',
                element: <ManageScholarships />
              },
              {
                path: 'all-reviews',
                element: <AllReviews />
              },
              {
                path: 'all-applications',
                element: <AllAppliedScholarships />
              },
              {
                path: 'add-scholarship',
                element: <AddScholarship />
              }
            ]
        },
        {
            path:'/admin-dashboard',
            element: (
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            ),
            children: [
              {
                index: true,
                element: <Navigate to="/admin-dashboard/my-profile" replace />
              },
              {
                path: 'my-profile',
                element: <AdminProfile />
              },
              {
                path: 'add-scholarship',
                element: <AddScholarship />
              },
              {
                path: 'manage-scholarships',
                element: <ManageScholarships />
              },
              {
                path: 'manage-applications',
                element: <AllAppliedScholarships />
              },
              {
                path: 'manage-reviews',
                element: <AllReviews />
              },
              {
                path: 'manage-users',
                element: <ManageUsers />
              }
            ]
        },
        {
            path:'/signUp',
            element:<SignUp></SignUp>,
        },
        {
            path:'/login',
            element:<Login></Login>
        }
    ],
  },
  {
    path: "*",
    element: <NotFound />
  }
]);


