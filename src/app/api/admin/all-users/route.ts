import { NextRequest, NextResponse } from 'next/server';
import { getAllUserProfiles, updateUserProfile, checkIfUserIsAdmin, addAdminUser, getUserProfile } from '@/lib/firebase';

// Helper function to verify admin authentication
async function verifyAdminAuth(request: NextRequest): Promise<{ email: string } | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const email = token;
    
    if (!email || !(await checkIfUserIsAdmin(email))) {
      return null;
    }
    
    return { email };
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const adminUser = await verifyAdminAuth(request);
    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await getAllUserProfiles();
    return NextResponse.json({ users });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const adminUser = await verifyAdminAuth(request);
    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { uid, updates } = await request.json();
    
    if (!uid || !updates) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // If promoting to admin, add to admin_users collection
    if (updates.role === 'admin') {
      const user = await getUserProfile(uid);
      if (user && user.email) {
        await addAdminUser(user.email, adminUser.email);
      }
    }

    const success = await updateUserProfile(uid, updates);
    if (success) {
      return NextResponse.json({ message: 'User updated successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}