import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ placeholder }) => {
  const [editorHtml, setEditorHtml] = useState('');
  const [theme, setTheme] = useState('snow');

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  return (
    <div style={{ width: '100%'}}>
      <ReactQuill
        // className='my-editor border border-gray-300 rounded'
        theme={theme}
        onChange={handleChange}
        value={editorHtml}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        bounds=".app"
        placeholder={placeholder}
      />
    </div>
  );
};

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
TextEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-2' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    [{ color: [] }, { background: [] }],
    [{ script: 'super' }, { script: 'sub' }],
    [{ align: [] }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['clean'],
    ['link', 'image', 'video'],
    ['font', 'size', 'style'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
TextEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'color',
  'background',
  'script',
  'align',
  'code-block',
];

/* 
 * PropType validation
 */
TextEditor.propTypes = {
  placeholder: PropTypes.string,
};

export default TextEditor;
