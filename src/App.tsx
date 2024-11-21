import React, { useState } from 'react';
import JsonEditor from './components/JsonEditor';
import FormPreview from './components/FormPreview';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [jsonSchema, setJsonSchema] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleJsonChange = (schema: any) => {
    try {
      if (!schema || !schema.fields || !Array.isArray(schema.fields)) {
        throw new Error('JSON must include a "fields" array');
      }

      setJsonSchema(schema);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON');
      setJsonSchema(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonSchema, null, 2));
    toast.success("Form JSON copied to clipboard!");
  }

  const defaultSchema = {
    formTitle: "Default Form Title",
    formDescription: "This is a default description for the form.",
    fields: [
      { id: "name", type: "text", label: "Name", required: true, placeholder: "Enter your name" },
      { id: "email", type: "email", label: "Email", required: true, placeholder: "Enter your email" },
    ],
  };
  const JsonCopy = () => {
    return (
      <button
        onClick={handleCopy}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Copy Form JSON
      </button>
    )
  }
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex justify-between item-center flex-col sm:flex-row bg-[#b45309]">
        <div className='text-xl font-bold p-1 mx-auto'>Form Generator</div>
        <div className='m-1'>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 text-white p-1 rounded"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
      <div className="bg-white flex flex-col md:flex-row dark:bg-gray-800 dark:text-zinc-500">
        <Toaster />
        <div className="w-full md:w-1/2 p-4 border-r">
          <h2 className="text-lg font-bold mb-4">JSON Editor <JsonCopy /></h2>
          <JsonEditor onJsonChange={handleJsonChange} />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-lg font-bold mb-4">Generated Form</h2>
          {jsonSchema ? (
            <FormPreview schema={jsonSchema || defaultSchema} />
          ) : (
            <p className="text-gray-500">Enter valid JSON to preview the form.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
