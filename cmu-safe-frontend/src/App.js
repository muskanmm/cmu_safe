import logo from './logo.svg';
import './App.css';
import GoogleMap from './GoogleMap.js';
import { useState } from 'react';
import React from 'react';


function App() {
  const [result, setResult] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showMap, setShowMap] = useState(false);

  const runPythonScript = async (origin, destination) => {
    const response = await fetch('http://localhost:5001/run-python', {
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
      origin: form.origin.value, 
      dest: form.destination.value, 
    };
    setOrigin(form.origin.value);
    setDestination(form.destination.value);
    setShowMap(true);
    runPythonScript(formData.origin, formData.dest);
  };

  return (
    <div className="App">
      <h1 className = "Title">CMU Safe</h1>
      <h2 lassName = "Subtitle">Making A Safer Campus for Everyone, Everywhere</h2>
      <div className = "content">
        <div className="Form">
          <form onSubmit={onSubmit}>
            <label>Origin: </label>
            <input type="text" id="origin" name="start"></input><br></br>
            <label>Destination: </label>
            <input type="text" id="destination" name="destination"></input><br></br>
            <input id="button" type="submit" value="Get The Safest Path Home"></input>
          </form>
        </div>
        <div className="Map">
          {showMap && <GoogleMap origin={origin} destination={destination} bluelight={result}/>}
        </div>
      </div>
    </div>
  );
  // return (
  //   <Router>
  //     <div>
  //       <Routes>
  //         <Route path="/" element={<FormPage />} />
  //         <Route path="/success" element={<MapPage />} />
  //       </Routes>
  //     </div>
  //   </Router>
  // );

}

export default App;
