'use client';

import React, { useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill-new';
import MediaLibrary, { MediaFile } from './MediaLibrary';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const DynamicReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface SimpleEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const SimpleEditor: React.FC<SimpleEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing your content...'
}) => {
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [viewMode, setViewMode] = useState('visual'); // 'visual' or 'html'
  const quillRef = useRef<ReactQuill>(null);

  const handleMediaSelect = (media: MediaFile) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, 'image', media.url, 'user');
    }
    setShowMediaLibrary(false);
  };

  const imageHandler = () => {
    setShowMediaLibrary(true);
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link', 'image', 'code-block'],
        ['clean']
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list',
    'link', 'image', 'code-block'
  ];

  return (
    <div className="simple-editor flex flex-col h-full">
      <div className="p-2 border-b border-gray-200 bg-gray-50 flex justify-end">
        <div className="flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('visual')}
            className={`px-3 py-1 text-sm font-medium rounded-l-md ${
              viewMode === 'visual'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          >
            Visual
          </button>
          <button
            type="button"
            onClick={() => setViewMode('html')}
            className={`-ml-px px-3 py-1 text-sm font-medium rounded-r-md ${
              viewMode === 'html'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          >
            HTML
          </button>
        </div>
      </div>

      {viewMode === 'visual' ? (
        <DynamicReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="flex-grow"
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter HTML content..."
          className="w-full flex-grow p-4 font-mono text-sm leading-relaxed focus:outline-none"
        />
      )}

      {showMediaLibrary && (
        <MediaLibrary
          isOpen={showMediaLibrary}
          onClose={() => setShowMediaLibrary(false)}
          onSelect={handleMediaSelect}
          type="image"
          defaultFolder="behind_brain"
        />
      )}
    </div>
  );
};

export default SimpleEditor;
