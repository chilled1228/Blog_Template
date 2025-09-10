import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST() {
  try {
    // Create the behind_brain folder marker
    const putCommand = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: 'behind_brain/',
      Body: '',
      ContentType: 'application/x-directory',
    });

    await s3Client.send(putCommand);

    return NextResponse.json({
      success: true,
      message: 'Behind_brain folder ensured',
    });
  } catch (error) {
    console.error('Error ensuring behind_brain folder:', error);
    return NextResponse.json(
      { error: 'Failed to ensure behind_brain folder' },
      { status: 500 }
    );
  }
}