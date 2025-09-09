'use client';

import React, { useState, useRef } from 'react';
import MediaLibrary, { MediaFile } from './MediaLibrary';

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
  const [isUploading, setIsUploading] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + text + value.substring(end);
    
    onChange(newValue);

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        const imageMarkup = `\n<img src="${result.url}" alt="${result.originalName}" style="max-width: 100%; height: auto;" />\n`;
        insertAtCursor(imageMarkup);
      } else {
        alert('Upload failed: ' + result.error);
      }
    } catch (error) {
      alert('Upload failed: ' + (error as Error).message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleMediaSelect = (media: MediaFile) => {
    const imageMarkup = `\n<img src="${media.url}" alt="${media.key}" style="max-width: 100%; height: auto;" />\n`;
    insertAtCursor(imageMarkup);
    setShowMediaLibrary(false);
  };

  const insertHeading = (level: number) => {
    const heading = `\n<h${level}>Heading ${level}</h${level}>\n`;
    insertAtCursor(heading);
  };

  const insertParagraph = () => {
    insertAtCursor('\n<p>New paragraph</p>\n');
  };

  const insertGameTemplate = () => {
    const gameTemplate = `\n<div class="game-container">
  <div class="game-header">
    <h2>Game Title</h2>
    <p>Game description or instructions</p>
  </div>
  
  <div class="game-content">
    <!-- Your game HTML here -->
    <canvas id="gameCanvas" width="400" height="300"></canvas>
    <!-- or other game elements -->
  </div>
  
  <script>
    // Your game JavaScript here
    // Will be automatically executed
  </script>
</div>\n`;
    insertAtCursor(gameTemplate);
  };

  const insertCodeBlock = () => {
    const codeBlock = `\n<pre><code class="language-javascript">
// Your code here
console.log("Hello World!");
</code></pre>\n`;
    insertAtCursor(codeBlock);
  };

  return (
    <div className="simple-editor border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-2">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => insertHeading(2)}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertHeading(3)}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={insertParagraph}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Paragraph"
          >
            P
          </button>
        </div>

        <div className="border-l border-gray-300 pl-2 flex gap-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className={`px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer inline-flex items-center ${
              isUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Upload Image"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              '📤 Upload'
            )}
          </label>

          <button
            type="button"
            onClick={() => setShowMediaLibrary(true)}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Media Library"
          >
            📁 Library
          </button>

          <button
            type="button"
            onClick={insertCodeBlock}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Code Block"
          >
            &lt;/&gt;
          </button>

          <button
            type="button"
            onClick={insertGameTemplate}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Game Template"
          >
            🎮 Game
          </button>
        </div>

        <div className="border-l border-gray-300 pl-2 flex gap-1">
          <button
            type="button"
            onClick={() => insertAtCursor('<strong>bold text</strong>')}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => insertAtCursor('<em>italic text</em>')}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 italic"
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => insertAtCursor('<a href="">link text</a>')}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Link"
          >
            🔗
          </button>
        </div>
      </div>

      {/* Editor */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={20}
        className="w-full p-4 border-none resize-none focus:outline-none font-mono text-sm leading-relaxed"
        style={{ minHeight: '500px' }}
      />

      {/* Status Bar */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-sm text-gray-600 flex justify-between">
        <span>
          {value.length} characters • {value.split(/\s+/).filter(word => word.length > 0).length} words
        </span>
        <span className="text-xs text-gray-500">
          💡 Tip: Use the toolbar buttons to insert HTML elements
        </span>
      </div>

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <MediaLibrary
          isOpen={showMediaLibrary}
          onClose={() => setShowMediaLibrary(false)}
          onSelect={handleMediaSelect}
          type="image"
        />
      )}
    </div>
  );
};

export default SimpleEditor;