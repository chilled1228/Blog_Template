'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { AdminUser, User } from './types';

const AdminsPage = ({ user }: { user: User }) => {
    const [admins, setAdmins] = useState<AdminUser[]>([]);

    const fetchAdmins = useCallback(async () => {
        const response = await fetch('/api/admin/users', {
            headers: { 'Authorization': `Bearer ${user.email}` }
        });
        if (response.ok) {
            const data = await response.json();
            setAdmins(data.adminUsers || []);
        }
    }, [user.email]);

    useEffect(() => {
        fetchAdmins();
    }, [fetchAdmins]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Admins</h1>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
                    <UserPlusIcon className="w-5 h-5 mr-2" />
                    Add Admin
                </button>
            </div>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added At</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map(admin => (
                            <tr key={admin.email}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.addedBy}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(admin.addedAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminsPage;
