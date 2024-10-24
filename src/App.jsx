import './App.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(0);
  const [isHeightValid, setIsHeightValid] = useState(true);
  const [isWeightValid, setIsWeightValid] = useState(true);

  const validate = (e) => {
    if (!!e.target.value.match('^[0-9]*$')) {
      if (e.target.name === 'height') {
        setHeight(e.target.value);
        setIsHeightValid(true);
      } else if (e.target.name === 'weight') {
        setWeight(e.target.value);
        setIsWeightValid(true);
      } 
    } else {
      if (e.target.name === 'height') {
        setIsHeightValid(false);
      } else if (e.target.name === 'weight') {
        setIsWeightValid(false);
      }
    }
  };

  const handleReset = () => {
    setHeight('');
    setWeight('');
    setBmi(0);
    setIsHeightValid(true);
    setIsWeightValid(true);
  };

  const calculateBMI = () => {
    if (isHeightValid && isWeightValid && height && weight) {
      const heightInMeters = height / 100; 
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi.toFixed(2)); 
    } else {
      if (!isHeightValid || height === '') {
        setIsHeightValid(false);
      }
      if (!isWeightValid || weight === '') {
        setIsWeightValid(false);
      }
    }
  };

  return (
    <>
      <div
        style={{
          height: '100vh',
          width: '100vw',
          backgroundImage: 'url("https://i.pinimg.com/originals/cf/5c/04/cf5c041174a9148431fbdf9bc90cabf8.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className='w-100 d-flex justify-content-center align-items-center'
      >
        <div className='container' style={{ width: '470px' }}>
          <h3 className="text-center text-white">BMI CALCULATOR</h3>

          <div className='mb-3 mt-3'>
            <TextField
              id="outlined-basic"
              label="Height (cm)"
              name='height'
              variant="outlined"
              className='w-100'
              onChange={validate}
              InputLabelProps={{
                style: { color: 'lightgray' },
              }}
              InputProps={{
                style: { 
                  backgroundColor: 'rgba(255, 255, 255, 0.274)', 
                  color: '#ffffff', 
                  borderColor: '#000000cf' 
                },
              }}
              value={height}
            />
            {!isHeightValid && <span className='text-danger'>*Invalid input</span>}
          </div>
          <div className='mb-3'>
            <TextField
              id="outlined-basic"
              label="Weight (kg)"
              variant="outlined"
              name='weight'
              className='w-100'
              onChange={validate}
              InputLabelProps={{
                style: { color: 'lightgray' },
              }}
              InputProps={{
                style: { 
                  backgroundColor: 'rgba(255, 255, 255, 0.274)', 
                  color: '#ffffff', 
                  borderColor: '#000000cf' 
                },
              }}
              value={weight}
            />
            {!isWeightValid && <span className='text-danger'>*Invalid input</span>}
          </div>
          <div className='mb-3 d-flex justify-content-between flex-wrap'>
            <Button 
              onClick={calculateBMI} 
              variant="contained" 
              style={{ 
                width: '150px', 
                height: '40px', 
                backgroundColor: '#f0f4f7', 
                color: 'black' 
              }}
            >
              Calculate
            </Button>
            <Button 
              onClick={handleReset} 
              variant="outlined" 
              style={{ 
                width: '150px', 
                height: '40px', 
                borderColor: '#0c1317de', 
                color: '#0a0404', 
                backgroundColor: 'rgba(245, 222, 238, 0.768)' 
              }}
            >
              Reset
            </Button>
          </div>

          <div className="transparent-box">
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
              Your BMI is: {bmi ? bmi : 'N/A'}
            </p>
          </div>

          <div className="grid">
            <div className={`grid-item small black ${bmi > 0 && bmi < 18.5 ? 'blink' : ''}`}>
              <h5>Underweight</h5>
              <p>Below 18.5</p>
            </div>
            <div className={`grid-item small green ${bmi > 0 && bmi >= 18.5 && bmi < 25 ? 'blink' : ''}`}>
              <h5>Normal weight</h5>
              <p>18.5 - 24.9</p>
            </div>
            <div className={`grid-item small yellow ${bmi > 0 && bmi >= 25 && bmi < 30 ? 'blink' : ''}`}>
              <h5>Overweight</h5>
              <p>25 - 29.9</p>
            </div>
            <div className={`grid-item small red ${bmi > 0 && bmi >= 30 ? 'blink' : ''}`}>
              <h5>Obese</h5>
              <p>30 and above</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
