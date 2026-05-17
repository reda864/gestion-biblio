import React, { useState } from "react";
import * as Components from '../components/Components';
import styled from 'styled-components';
import api from '../services/api';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

export default function AuthPage() {
  const [signIn, toggle] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Ensure password confirmation matches
    if (formData.password !== formData.password_confirmation) {
      setError('Password and confirmation do not match');
      return;
    }

    try {
      const response = await api.post('/register', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        password_confirmation: formData.password_confirmation
      });
      setSuccess('Registration successful! You can now login.');
      toggle(true); // Switch to login form
    } catch (err) {
      if (err.response?.status === 422) {
 
        const validationErrors = err.response.data;
        const errorMessages = Object.entries(validationErrors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post('/login', {
        email: formData.email,
        password: formData.password
      });
      
      // Store the token in localStorage
      localStorage.setItem('token', response.data.access_token);
      
      // Redirect to AdminDashboard
      window.location.href = '/admin';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <PageContainer>
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleRegister}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input 
              type='text' 
              name='name'
              placeholder='Name' 
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Components.Input 
              type='email' 
              name='email'
              placeholder='Email' 
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Components.Input 
              type='password' 
              name='password'
              placeholder='Password' 
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Components.Input 
              type='password' 
              name='password_confirmation'
              placeholder='Confirm Password' 
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleLogin}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input 
              type='email' 
              name='email'
              placeholder='Email' 
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Components.Input 
              type='password' 
              name='password'
              placeholder='Password' 
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </PageContainer>
  );
}

