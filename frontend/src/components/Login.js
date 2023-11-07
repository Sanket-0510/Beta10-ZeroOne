import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigation = useNavigate();
  const [phoneNo, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Initial step

  const handlePhoneSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNo }),
      });

      if (response.ok) {
        // If phone number verification is successful, proceed to OTP input
        setStep(2);
      } else {
        // Handle error (e.g., display an error message to the user)
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp:otp }),
      });

      if (response.ok) {
        // OTP verification successful, the user is logged in
        // You can perform further actions (e.g., store user session)
      } else {
        // Handle error (e.g., display an error message to the user)
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      {step === 1 ? (
        <div className="phone-input">
          <label htmlFor="phone">Enter Phone Number:</label>
          <input
            type="text"
            id="phoneNo"
            value={phoneNo}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            Number"
          />
          <button onClick={handlePhoneSubmit}>Submit</button>
        </div>
      ) : step === 2 ? (
        <div className="otp-input">
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            name='otp'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
          />
          <button onClick={handleOtpSubmit}>Submit</button>
        </div>
      ) : null}
    </div>
  );
}
