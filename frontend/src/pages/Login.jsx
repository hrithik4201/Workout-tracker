import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import '../styles/Login.css';

import { ReactComponent as EyeIcon } from '../assets/icons/eye-solid.svg';
import { ReactComponent as EyeSlashIcon } from '../assets/icons/eye-slash-solid.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-container'>
      <form className='login' onSubmit={handleSubmit}>
        <h1>Log In</h1>

        <label>Email address:</label>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <div className='password-input-container'>
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <svg
            className='password-icon'
            onClick={handleTogglePassword}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              cursor: 'pointer',
            }}
            viewBox='0 0 24 24'
            width='20'
            height='24'
          >
            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </svg>
        </div>

        <button disabled={isLoading}>Log in</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
