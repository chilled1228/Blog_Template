'use client';

import { useState, useEffect, useCallback } from 'react';

export interface MediaFile {
  key: string;
  size: number;
  lastModified: string;
  type: string;
  url: string;
  sizeFormatted: string;
}

interface MediaLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: MediaFile) => void;
  type?: 'image' | 'all';
}

export default function MediaLibrary({ isOpen, onClose, onSelect, type = 'image' }: MediaLibraryProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchFiles = useCallback(async (cursor?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        type,
        limit: '20',
        ...(cursor && { cursor }),
      });

      const response = await fetch(`/api/admin/media?${params}`);
      const data = await response.json();

      if (data.success) {
        if (cursor) {
          // Merge and sort by newest first when loading more
          setFiles(prev => {
            const mergedFiles = [...prev, ...data.files];
            mergedFiles.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
            return mergedFiles;
          });
        } else {
          setFiles(data.files);
        }
        setNextCursor(data.nextCursor);
        setHasMore(data.isTruncated);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    if (isOpen) {
      fetchFiles();
    }
  }, [isOpen, fetchFiles]);

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Are you sure you want to delete "${file.key}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/media?key=${encodeURIComponent(file.key)}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setFiles(prev => prev.filter(f => f.key !== file.key));
        if (selectedFile?.key === file.key) {
          setSelectedFile(null);
        }
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleLoadMore = () => {
    if (nextCursor && !loading) {
      fetchFiles(nextCursor);
    }
  };

  const filteredFiles = files.filter(file =>
    file.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Media Library</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = async (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    
                    try {
                      const response = await fetch('/api/admin/upload', {
                        method: 'POST',
                        body: formData,
                      });
                      const result = await response.json();
                      
                      if (result.success) {
                        // Reset and fetch files to show new upload at top
                        setFiles([]);
                        setNextCursor(null);
                        fetchFiles(); // Refresh the list
                      } else {
                        alert('Upload failed: ' + result.error);
                      }
                    } catch (error) {
                      alert('Upload failed');
                    }
                  }
                };
                input.click();
              }}
              className="px-4 py-2 bg-button text-white rounded hover:bg-button-hover"
            >
              📁 Upload
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* File Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading && files.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p>Loading media...</p>
                </div>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center text-gray-500">
                  <p>No files found</p>
                  <button
                    onClick={() => fetchFiles()}
                    className="mt-2 text-primary hover:text-primary-hover"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.key}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedFile?.key === file.key
                          ? 'ring-2 ring-primary border-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedFile(file)}
                    >
                      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                        {file.type === 'image' ? (
                          <img
                            src={file.url}
                            alt={file.key}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400 text-center p-4">
                            <div className="text-2xl mb-1">📄</div>
                            <div className="text-xs truncate">{file.key}</div>
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <div className="text-xs text-gray-600 truncate" title={file.key}>
                          {file.key}
                        </div>
                        <div className="text-xs text-gray-500 flex justify-between">
                          <span>{file.sizeFormatted}</span>
                          <span>{new Date(file.lastModified).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center mt-4">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Preview Panel */}
          <div className="w-80 border-l p-4">
            {selectedFile ? (
              <div className="space-y-4">
                <h3 className="font-semibold">Preview</h3>
                
                {selectedFile.type === 'image' ? (
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={selectedFile.url}
                      alt={selectedFile.key}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ) : (
                  <div className="border rounded-lg h-48 flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📄</div>
                      <p className="text-sm text-gray-600">No preview available</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-500">File Name</label>
                    <div className="text-sm font-medium truncate">{selectedFile.key}</div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Size</label>
                    <div className="text-sm">{selectedFile.sizeFormatted}</div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Type</label>
                    <div className="text-sm capitalize">{selectedFile.type}</div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">URL</label>
                    <div className="text-xs text-gray-600 break-all">{selectedFile.url}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedFile.url);
                      alert('URL copied to clipboard!');
                    }}
                    className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                  >
                    📋 Copy URL
                  </button>
                  <button
                    onClick={() => handleDelete(selectedFile)}
                    className="w-full px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                  >
                    🗑️ Delete
                  </button>
                  <button
                    onClick={() => {
                      onSelect(selectedFile);
                      onClose();
                    }}
                    className="w-full px-3 py-2 bg-button text-white rounded hover:bg-button-hover text-sm"
                  >
                    ✓ Select
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                <div className="text-4xl mb-2">📁</div>
                <p>Select a file to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}