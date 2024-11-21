import { useState } from 'react';

function JsonEditor({ onJsonChange }: { onJsonChange: (json: any) => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    try {
      const parsedJson = JSON.parse(value);
      setError('');
      onJsonChange(parsedJson);
    } catch (err) {
      setError('Invalid JSON');
    }
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={handleChange}
        className="w-full h-96 p-2 border"
        placeholder="Enter your JSON here..."
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default JsonEditor;