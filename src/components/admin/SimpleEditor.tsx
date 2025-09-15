'use client';

import React, { useState } from 'react';
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
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [viewMode, setViewMode] = useState('html'); // 'html' or 'raw'
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleMediaSelect = (media: MediaFile) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Create properly formatted image HTML
      const imageHtml = `\n<figure class="wp-block-image size-large">
  <img src="${media.url}" alt="" class="wp-image" style="max-width: 100%; height: auto;" />
  <figcaption>Enter image caption here...</figcaption>
</figure>\n`;
      
      // Insert at cursor position
      const newValue = value.substring(0, start) + imageHtml + value.substring(end);
      onChange(newValue);
      
      // Set cursor after the inserted image
      setTimeout(() => {
        const newCursorPos = start + imageHtml.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
      }, 0);
    } else {
      // Fallback: append to end
      const imageHtml = `\n<figure class="wp-block-image size-large">
  <img src="${media.url}" alt="" class="wp-image" style="max-width: 100%; height: auto;" />
  <figcaption>Enter image caption here...</figcaption>
</figure>\n`;
      onChange(value + imageHtml);
    }
    setShowMediaLibrary(false);
  };

  const handleDirectUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'behind_brain'); // Default folder
        
        try {
          const response = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formData,
          });
          const result = await response.json();
          
          if (result.success) {
            // Auto-insert the uploaded image into the editor
            const textarea = textareaRef.current;
            if (textarea) {
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              
              const imageHtml = `\n<figure class="wp-block-image size-large">
  <img src="${result.url}" alt="" class="wp-image" style="max-width: 100%; height: auto;" />
  <figcaption>Enter image caption here...</figcaption>
</figure>\n`;
              
              const newValue = value.substring(0, start) + imageHtml + value.substring(end);
              onChange(newValue);
              
              // Set cursor after the inserted image
              setTimeout(() => {
                const newCursorPos = start + imageHtml.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
                textarea.focus();
              }, 0);
            } else {
              // Fallback: append to end
              const imageHtml = `\n<figure class="wp-block-image size-large">
  <img src="${result.url}" alt="" class="wp-image" style="max-width: 100%; height: auto;" />
  <figcaption>Enter image caption here...</figcaption>
</figure>\n`;
              onChange(value + imageHtml);
            }
          } else {
            alert('Upload failed: ' + result.error);
          }
        } catch (error) {
          alert('Upload failed');
        }
      }
    };
    input.click();
  };

  const insertHtmlElement = (htmlTag: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);
      
      let htmlToInsert = '';
      
      switch (htmlTag) {
        case 'h2':
          htmlToInsert = `<h2>${selectedText || 'Heading 2'}</h2>`;
          break;
        case 'h3':
          htmlToInsert = `<h3>${selectedText || 'Heading 3'}</h3>`;
          break;
        case 'p':
          htmlToInsert = `<p>${selectedText || 'Paragraph text'}</p>`;
          break;
        case 'strong':
          htmlToInsert = `<strong>${selectedText || 'Bold text'}</strong>`;
          break;
        case 'em':
          htmlToInsert = `<em>${selectedText || 'Italic text'}</em>`;
          break;
        case 'ul':
          htmlToInsert = `<ul>\n  <li>${selectedText || 'List item'}</li>\n</ul>`;
          break;
        case 'ol':
          htmlToInsert = `<ol>\n  <li>${selectedText || 'List item'}</li>\n</ol>`;
          break;
        case 'blockquote':
          htmlToInsert = `<blockquote>${selectedText || 'Quote text'}</blockquote>`;
          break;
        case 'code':
          htmlToInsert = `<code>${selectedText || 'Code snippet'}</code>`;
          break;
        case 'pre':
          htmlToInsert = `<pre><code>${selectedText || 'Code block'}</code></pre>`;
          break;
        case 'a':
          htmlToInsert = `<a href="https://example.com">${selectedText || 'Link text'}</a>`;
          break;
      }
      
      const newValue = value.substring(0, start) + htmlToInsert + value.substring(end);
      onChange(newValue);
      
      // Set cursor after the inserted element
      setTimeout(() => {
        const newCursorPos = start + htmlToInsert.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
      }, 0);
    }
  };

  return (
    <div className="simple-editor flex flex-col h-full">
      {/* Toolbar */}
      {viewMode === 'html' && (
        <div className="p-2 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap items-center gap-1">
            {/* Formatting buttons */}
            <button
              type="button"
              onClick={() => insertHtmlElement('h2')}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Heading 2"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => insertHtmlElement('h3')}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Heading 3"
            >
              H3
            </button>
            <button
              type="button"
              onClick={() => insertHtmlElement('p')}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Paragraph"
            >
              P
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button
              type="button"
              onClick={() => insertHtmlElement('strong')}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              onClick={() => insertHtmlElement('em')}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Italic"
            >
              <em>I</em>
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button
              type="button"
              onClick={() => insertHtmlElement('ul')}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Unordered List"
            >
              • List
            </button>
            <button
              type="button"
              onClick={() => insertHtmlElement('ol')}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Ordered List"
            >
              1. List
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button
              type="button"
              onClick={() => insertHtmlElement('a')}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Link"
            >
              Link
            </button>
            <button
              type="button"
              onClick={handleDirectUpload}
              className="px-2 py-1 text-xs font-medium text-white bg-blue-600 border border-blue-600 rounded hover:bg-blue-700"
              title="Upload & Insert Image"
            >
              📤 Upload
            </button>
            <button
              type="button"
              onClick={() => setShowMediaLibrary(true)}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Browse Media Library"
            >
              📁 Browse
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button
              type="button"
              onClick={() => insertHtmlElement('blockquote')}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Quote"
            >
              Quote
            </button>
            <button
              type="button"
              onClick={() => insertHtmlElement('code')}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Inline Code"
            >
              Code
            </button>
            <button
              type="button"
              onClick={() => insertHtmlElement('pre')}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Code Block"
            >
              Code Block
            </button>
          </div>
        </div>
      )}
      
      {/* Mode switcher */}
      <div className="p-2 border-b border-gray-200 bg-gray-50 flex justify-end">
        <div className="flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('html')}
            className={`px-3 py-1 text-sm font-medium rounded-l-md ${
              viewMode === 'html'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          >
            HTML
          </button>
          <button
            type="button"
            onClick={() => setViewMode('raw')}
            className={`-ml-px px-3 py-1 text-sm font-medium rounded-r-md ${
              viewMode === 'raw'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          >
            Raw HTML
          </button>
        </div>
      </div>

      {viewMode === 'html' ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full flex-grow p-4 font-mono text-sm leading-relaxed focus:outline-none"
        />
      ) : (
        <div className="flex flex-col flex-grow">
          <div className="p-2 bg-yellow-50 border-b border-yellow-200 text-sm text-yellow-800">
            ⚠️ Raw HTML Mode: Content will be saved exactly as typed, including JavaScript. Use with caution.
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter raw HTML content with JavaScript..."
            className="w-full flex-grow p-4 font-mono text-sm leading-relaxed focus:outline-none border-0"
            style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
          />
        </div>
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
