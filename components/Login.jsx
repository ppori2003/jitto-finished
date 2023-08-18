import React from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';

const Login = () => {
  const { user, login, logout, username } = useStateContext();

  if (user) {
    return (
      <button onClick={logout}>{username} Logout</button>
    );
  } else {
    return (
      <button onClick={login}>Login</button>
    );
  }
};

export default Login;
