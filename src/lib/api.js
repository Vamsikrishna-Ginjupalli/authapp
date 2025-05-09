const API_URL = import.meta.env.PROD 
  ? '/api' 
  : 'http://localhost:5000/api';

export async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
}

export async function register(userData) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
}

export async function requestReset(email) {
  const response = await fetch(`${API_URL}/request-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error((await response.json()).message);
  return response.json();
}

export async function resetPassword(token, newEmail, newPassword) {
  const response = await fetch(`${API_URL}/reset-password/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newEmail, newPassword }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Reset failed');
  }

  return response.json();


  
// @ts-ignore
}
//  catch (error) {
//   throw new Error(error.message || 'Network error');
// }
export async function verifyToken(token) {
  const response = await fetch(`${API_URL}/verify-token`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Invalid token');
  return response.json();
}


