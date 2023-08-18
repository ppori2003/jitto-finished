import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('signup');
  const [responseData, setResponseData] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);


  const onSubmit = async (event) => {
    event.preventDefault();

    if (action === 'signout') {
      try {
        const response = await axios.post(
          'https://ph6oye0lkg.execute-api.us-east-1.amazonaws.com/dev/signout',
          {
            // Add any sign-out payload if needed
          },
          {
            headers: {
              'x-api-key': 'sahPOIF9Xz9sLoCdV9Sby96tsdSBT1QM5pCfVdUa', // Replace with your API key
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('User signed out successfully:', response.data);
        // Clear user-related state, reset form fields, etc.
        setEmail('');
        setPassword('');
        setResponseStatus(null);
        setResponseData(null);
      } catch (error) {
        console.error('Error signing out:', error);
        // Handle sign-out error if needed
      }
      return;
    }
  
    try {
      const response = await axios.post(
        action === 'signup' ? 'https://ph6oye0lkg.execute-api.us-east-1.amazonaws.com/dev/signup' 
        : 'https://ph6oye0lkg.execute-api.us-east-1.amazonaws.com/dev/signin',
        
        {
          email,
          password,
        },
        {
          headers: {
            'x-api-key': 'sahPOIF9Xz9sLoCdV9Sby96tsdSBT1QM5pCfVdUa', // Replace with your API key
            'Content-Type': 'application/json',
          },
        }
      );

       console.log(response.data);
      setResponseStatus(response.data['statusCode']); // if success 200 fails 401 for
      setResponseData(response.data['body']);

      // Only set status to 'succeeded' if the API call was successful
    } catch (error) {
      console.error('Error signing up:', error);
      // Set status to 'failed' if the API call throws an error
    }
  };

  return (
    <div>
    {/* Render the forms only if user is not logged in */}
    {/* 200 meaning successfully logged in */}
    {responseStatus !== 200 && (
      <form onSubmit={onSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password' // Use type 'password' to display *****
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type='submit' onClick={() => setAction('signup')}>Sign Up</button>
        <button type='submit' onClick={() => setAction('signin')}>Sign In</button>
      </form>
      ) 
    }
    {responseStatus === 200 && (
      <form onSubmit={onSubmit}>
        <button type='submit' onClick={() => setAction('signout')}>Sign Out</button>
      </form>
      ) 
    }


      {/* Render success or failure message based on signupStatus */}
        {/* <p>{responseData}</p>  */}
       {/* {responseData === "\"User signed in successfully\"" &&  <button type='submit' hidden={false} onClick={() => setAction('signout')}>Sign Out</button>}   */}
       {responseData === "\"Error signing in: An error occurred (InvalidParameterException) when calling the InitiateAuth operation: Missing required parameter USERNAME\"" && <p>Missing required parameter</p>} 
       {responseData === "\"Error signing up: An error occurred (UsernameExistsException) when calling the SignUp operation: An account with the given email already exists.\"" && <p>An account with the given email already exists.</p>}
       {responseData === "\"Error signing in: An error occurred (NotAuthorizedException) when calling the InitiateAuth operation: Incorrect username or password.\"" && <p>Incorrect username or password.</p>}
       {responseData === "\"Error signing up: An error occurred (InvalidParameterException) when calling the SignUp operation: Invalid email address format.\"" && <p>Invalid email address format or password. Recommend strong password.</p>}
       {responseData === "\"Error signing up: An error occurred (InvalidParameterException) when calling the SignUp operation: 1 validation error detected: Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\\\\S]+.*[\\\\S]+$\"" &&
        <p>Member must satisfy regular expression pattern: ^[\\\\S]+.*[\\\\S]+$\</p>}

        
  
    
    </div>
  );
};


export default Signup;
