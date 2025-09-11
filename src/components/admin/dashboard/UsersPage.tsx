'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from './types';

const UsersPage = ({ user: currentUser }) => {
    const [users, setUsers] = useState<UserProfile[]>([]);

    const fetchUsers = useCallback(async () => {
        const response = await fetch('/api/admin/all-users', {
            headers: { 'Authorization': `Bearer ${currentUser.email}` }
        });
        if (response.ok) {
            const data = await response.json();
            setUsers(data.users || []);
        }
    }, [currentUser.email]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Users</h1>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.uid}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersPage;
