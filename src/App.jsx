// App.jsx
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSuccess = (credentialResponse) => {
    const { credential } = credentialResponse;
    const decoded = jwtDecode(credential);

    const email = decoded.email;

    if (email.endsWith('@nyu.edu')) {
      setUserEmail(email);
      setErrorMessage('');
      console.log('Login successful:', email);
      console.log('Login successful, credential:', credential);
      console.log('Login successful, decoded:', decoded);
      // Proceed with authenticated user flow
    } else {
      setErrorMessage('Access denied: Please use your NYU email to sign in.');
      console.error('Access denied: Email domain is not @nyu.edu');
    }
  };

  const handleLoginError = () => {
    setErrorMessage('Login Failed');
    console.error('Login Failed');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!userEmail ? (
        <>
          <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </>
      ) : (
        <p className="text-green-500">Welcome, {userEmail}!</p>
      )}
    </div>
  );
}

export default App;