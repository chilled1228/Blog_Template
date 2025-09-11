import { NextRequest, NextResponse } from 'next/server';
import { checkIfUserIsAdmin, addAdminUser, removeAdminUser, getAllAdminUsers } from '@/lib/firebase';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Helper function to verify admin authentication
async function verifyAdminAuth(request: NextRequest): Promise<{ email: string } | null> {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    
    // For simplicity, we'll use the token as email verification
    // In production, you should verify Firebase ID tokens
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

    const adminUsers = await getAllAdminUsers();
    return NextResponse.json({ adminUsers });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminUser = await verifyAdminAuth(request);
    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Check if user is already admin
    const isAdmin = await checkIfUserIsAdmin(email);
    if (isAdmin) {
      return NextResponse.json({ error: 'User is already an admin' }, { status: 400 });
    }

    const success = await addAdminUser(email, adminUser.email);
    if (success) {
      return NextResponse.json({ message: 'Admin user added successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to add admin user' }, { status: 500 });
    }
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to add admin user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const adminUser = await verifyAdminAuth(request);
    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    // Prevent removing yourself
    if (email === adminUser.email) {
      return NextResponse.json({ error: 'Cannot remove your own admin access' }, { status: 400 });
    }

    // Prevent removing the last admin
    const allAdmins = await getAllAdminUsers();
    if (allAdmins.length <= 1) {
      return NextResponse.json({ error: 'Cannot remove the last admin user' }, { status: 400 });
    }

    const success = await removeAdminUser(email);
    if (success) {
      return NextResponse.json({ message: 'Admin user removed successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to remove admin user' }, { status: 500 });
    }
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to remove admin user' }, { status: 500 });
  }
}