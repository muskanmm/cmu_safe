import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [result, setResult] = useState('');

  const runPythonScript = async () => {
    const response = await fetch('http://localhost:5000/run-python', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scriptName: '../cmu-safe-backend/main.py',  // Path to Python script in backend
        args: ['arg1', 'arg2'],
      }),
    });

    const data = await response.text();
    setResult(data);
  };

  return (
    <div className="App">
      <button onClick={runPythonScript}>Run Python Script</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default App;
