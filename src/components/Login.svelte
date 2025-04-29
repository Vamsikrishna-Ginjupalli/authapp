<script>
  import { navigate } from "../lib/router.js";
  import { login } from "../lib/api.js";
  
  export let imageUrl = "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg";
  
  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  async function handleLogin() {
    if (!email || !password) {
      error = 'Please fill in all fields';
      return;
    }

    try {
      loading = true;
      error = '';
      const response = await login(email, password);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      navigate("/dashboard");
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function goToRegister() {
    navigate("/register");
  }

  function goToReset() {
    navigate("/reset");
  }
</script>

<main class="container">
  <div class="login-section">
    <div class="login-form">
      <h1>Welcome Back</h1>
      
      {#if error}
        <div class="error-message">{error}</div>
      {/if}
      
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email"
          bind:value={email}
          placeholder="Enter your email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password"
          bind:value={password}
          placeholder="Enter your password"
        />
      </div>

      <div class="links">
        <a href="/reset" on:click|preventDefault={goToReset}>Forgot Password?</a>
        <a href="/register" on:click|preventDefault={goToRegister}>Register</a>
      </div>

      <button on:click={handleLogin} disabled={loading}>
        {#if loading}
          Loading...
        {:else}
          Login
        {/if}
      </button>
    </div>
  </div>

  <div class="image-section">
    <img 
      src={imageUrl}
      alt="Login background"
    />
  </div>
</main>

<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .login-section {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  .image-section {
    flex: 1;
    overflow: hidden;
  }

  .image-section img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .login-form {
    width: 100%;
    max-width: 400px;
  }

  h1 {
    margin-bottom: 2rem;
    color: #333;
    font-size: 2rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #666;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: #4a90e2;
  }

  .links {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  a {
    color: #4a90e2;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover:not(:disabled) {
    background-color: #357abd;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .error-message {
    background-color: #ffebee;
    color: #c62828;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
</style>