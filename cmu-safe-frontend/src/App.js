import logo from './logo.svg';
import './App.css';
import GoogleMap from './GoogleMap.js';
import { useState } from 'react';

function App() {
  const [result, setResult] = useState('');

  const runPythonScript = async (origin, destination) => {
    const response = await fetch('http://localhost:5000/run-python', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scriptName: '../cmu-safe-backend/main.py',  // Path to Python script in backend
        args: [origin, destination],
      }),
    });

    const data = await response.text();
    setResult(data);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      origin: form.origin.value, // Access value of the input field with name="name"
      dest: form.destination.value, // Access value of the input field with name="email"
    };

    runPythonScript(formData.origin, formData.dest);
  };

  return (
    <div className="App">
      <h1>CMU Safe</h1>
      <div className="Form">
        <form onSubmit={onSubmit}>
          <label>Origin: </label>
          <input type="text" id="origin" name="origin"></input><br></br>
          <label>Destination: </label>
          <input type="text" id="destination" name="destination"></input><br></br>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
      <GoogleMap />
    </div>
  );

}

export default App;
