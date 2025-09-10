import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

// Helper function to get file type from key
function getFileType(key: string): string {
  const extension = key.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
    return 'image';
  }
  return 'other';
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const limit = parseInt(searchParams.get('limit') || '50');
    const cursor = searchParams.get('cursor');
    const folder = searchParams.get('folder') || '';

    const prefix = folder ? `${folder}/` : '';

    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME!,
      MaxKeys: limit,
      ContinuationToken: cursor || undefined,
      Prefix: prefix,
      Delimiter: '/',
    });

    const response = await s3Client.send(listCommand);

    // Extract files (excluding folders)
    const files = (response.Contents || [])
      .filter(obj => obj.Key !== prefix && !obj.Key?.endsWith('/')) // Filter out the folder prefix itself and folder markers
      .map(obj => ({
        key: obj.Key!,
        size: obj.Size!,
        lastModified: obj.LastModified!,
        type: getFileType(obj.Key!),
        url: `${process.env.R2_PUBLIC_URL}/${obj.Key}`,
        sizeFormatted: formatFileSize(obj.Size!),
      }))
      .filter(file => type === 'all' || file.type === type)
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    // Extract subfolders
    const folders = (response.CommonPrefixes || [])
      .map(prefixObj => ({
        key: prefixObj.Prefix!.replace(/\/$/, ''),
        name: prefixObj.Prefix!.replace(/^\s+|\s+$/g, '').replace(/\/$/, '').split('/').pop() || '',
        type: 'folder',
        lastModified: new Date().toISOString(),
      }))
      .filter(folder => folder.name !== '');

    return NextResponse.json({
      success: true,
      files,
      folders,
      nextCursor: response.NextContinuationToken,
      isTruncated: response.IsTruncated,
    });

  } catch (error) {
    console.error('Error listing media:', error);
    return NextResponse.json(
      { error: 'Failed to list media files' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json(
        { error: 'File key is required' },
        { status: 400 }
      );
    }

    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    });

    await s3Client.send(deleteCommand);

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, folderName, parentFolder = '' } = await request.json();

    if (action === 'createFolder') {
      if (!folderName) {
        return NextResponse.json(
          { error: 'Folder name is required' },
          { status: 400 }
        );
      }

      // Validate folder name
      if (!/^[a-zA-Z0-9_\-\s]+$/.test(folderName)) {
        return NextResponse.json(
          { error: 'Folder name can only contain letters, numbers, spaces, hyphens, and underscores' },
          { status: 400 }
        );
      }

      const folderKey = parentFolder ? `${parentFolder}/${folderName}/` : `${folderName}/`;

      // Create an empty folder marker object
      const putCommand = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: folderKey,
        Body: '',
        ContentType: 'application/x-directory',
      });

      await s3Client.send(putCommand);

      return NextResponse.json({
        success: true,
        message: 'Folder created successfully',
        folder: {
          key: folderKey.replace(/\/$/, ''),
          name: folderName,
          type: 'folder',
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error creating folder:', error);
    return NextResponse.json(
      { error: 'Failed to create folder' },
      { status: 500 }
    );
  }
}