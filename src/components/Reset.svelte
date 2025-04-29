<script>
  import { navigate } from "../lib/router.js";
  
  export let imageUrl = "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg";
  
  let email = '';

  function handleReset() {
    console.log('Reset password for:', email);
    navigate("/");
  }

  function goToLogin() {
    navigate("/");
  }
</script>

<main class="container">
  <div class="reset-section">
    <div class="reset-form">
      <h1>Reset Password</h1>
      <p>Enter your email to receive a reset link</p>
      
      <div class="form-group">
        <label for="email">Email Address</label>
        <input 
          type="email" 
          id="email"
          bind:value={email}
          placeholder="Enter your email"
        />
      </div>

      <button on:click={handleReset}>Send Reset Link</button>
      
      <div class="login-link">
        <p>Remember your password? <a href="/" on:click|preventDefault={goToLogin}>Login</a></p>
      </div>
    </div>
  </div>

  <div class="image-section">
    <img 
      src={imageUrl}
      alt="Reset password background"
    />
  </div>
</main>

<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .reset-section {
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

  .reset-form {
    width: 100%;
    max-width: 400px;
  }

  h1 {
    margin-bottom: 1rem;
    color: #333;
    font-size: 2rem;
  }

  p {
    color: #666;
    margin-bottom: 2rem;
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
    margin-bottom: 1rem;
  }

  button:hover {
    background-color: #357abd;
  }

  .login-link {
    text-align: center;
  }

  .login-link a {
    color: #4a90e2;
    text-decoration: none;
  }

  .login-link a:hover {
    text-decoration: underline;
  }
</style>