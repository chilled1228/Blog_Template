'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminAuth from '@/components/admin/AdminAuth';
import NewAdminDashboard from '@/components/admin/NewAdminDashboard';
import { auth, checkIfUserIsAdmin } from '@/lib/firebase';
import { 
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

interface User {
  id: string;
  email: string;
  role?: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser && firebaseUser.email) {
          // Check if user is admin
          const isAdmin = await checkIfUserIsAdmin(firebaseUser.email);
          if (isAdmin) {
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              role: 'admin'
            });
          } else {
            setUser(null);
            await signOut(auth);
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    };

    checkAuth();
  }, []);

  
  const handleAuth = (authenticatedUser: User) => {
    setUser(authenticatedUser);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AdminAuth onAuth={handleAuth} />;
  }

  return <NewAdminDashboard user={user} onLogout={handleLogout} />;
}