import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on role filter
    if (roleFilter === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.role === roleFilter));
    }
  }, [roleFilter, users]);

  const fetchUsers = () => {
    fetch('https://schoolarship-management-system-serv.vercel.app/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        toast.error('Failed to load users');
        setLoading(false);
      });
  };

  const handleRoleChange = (email, newRole, currentName) => {
    Swal.fire({
      title: 'Change User Role?',
      html: `Change role for <b>${currentName}</b> to <b>${newRole}</b>?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://schoolarship-management-system-serv.vercel.app/users/role/${email}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ role: newRole })
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount > 0) {
              Swal.fire({
                title: 'Success!',
                text: `Role updated to ${newRole}!`,
                icon: 'success',
                confirmButtonColor: '#DC2626'
              });
              fetchUsers();
            } else {
              toast.info('No changes made');
            }
          })
          .catch(err => {
            console.error('Error updating role:', err);
            toast.error('Failed to update role');
          });
      }
    });
  };

  const handleDeleteUser = (email, name) => {
    Swal.fire({
      title: 'Are you sure?',
      html: `Delete user <b>${name}</b>?<br><small>This action cannot be undone!</small>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://schoolarship-management-system-serv.vercel.app/users/${email}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: 'Deleted!',
                text: 'User has been deleted successfully.',
                icon: 'success',
                confirmButtonColor: '#DC2626'
              });
              fetchUsers();
            } else {
              toast.error('Failed to delete user');
            }
          })
          .catch(err => {
            console.error('Error deleting user:', err);
            toast.error('Failed to delete user');
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
            <p className="text-gray-600 mt-1">
              Total: {filteredUsers.length} {roleFilter !== 'all' && `${roleFilter}(s)`}
            </p>
          </div>
          
          {/* Role Filter Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-gray-700">Filter by Role:</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-semibold"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={user.photoURL || 'https://via.placeholder.com/40'}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{user.email}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.email, e.target.value, user.name)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full border-2 cursor-pointer transition-all ${
                          user.role === 'admin'
                            ? 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100'
                            : user.role === 'moderator'
                            ? 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
                            : 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100'
                        }`}
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleDeleteUser(user.email, user.name)}
                        className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm"
                        title="Delete User"
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-blue-600">{users.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Regular Users</p>
            <p className="text-2xl font-bold text-green-600">
              {users.filter(u => u.role === 'user').length}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Moderators</p>
            <p className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.role === 'moderator').length}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Admins</p>
            <p className="text-2xl font-bold text-red-600">
              {users.filter(u => u.role === 'admin').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
