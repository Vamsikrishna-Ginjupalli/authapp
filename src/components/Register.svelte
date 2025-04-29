<script>
  import { navigate } from "../lib/router.js";
  import {register} from "../lib/api.js"
  
  export let imageUrl = "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg";
  
  let firstName = '';
  let lastName = '';
  let email = '';
  let mobile = '';
  let password = '';
  let error ="";
  let loading =false;
 

  async function handleSubmit() {
    if (!firstName || !lastName || !email || !mobile || !password) {
      return;
    }

    try {
      loading = true;
      const userData = {
        firstName,
        lastName,
        email,
        mobile,
        password
      };
      
      const response = await register(userData);
      if (response.message === 'User registered successfully') {
        navigate("/");
      }
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function goToLogin() {
    navigate("/");
  }
</script>

<main class="container">
  <div class="register-section">
    <div class="register-form">
      <h1>Create Account</h1>
      
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName"
            bind:value={firstName}
            placeholder="Enter first name"
          />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName"
            bind:value={lastName}
            placeholder="Enter last name"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email"
          bind:value={email}
          placeholder="Enter email address"
        />
      </div>

      <div class="form-group">
        <label for="mobile">Mobile Number</label>
        <input 
          type="tel" 
          id="mobile"
          bind:value={mobile}
          placeholder="Enter mobile number"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password"
          bind:value={password}
          placeholder="Create password"
        />
      </div>

      <button on:click={handleSubmit}>Submit</button>
      
      <div class="login-link">
        <p>Already have an account? <a href="/" on:click|preventDefault={goToLogin}>Login</a></p>
      </div>
    </div>
  </div>

  <div class="image-section">
    <img 
      src={imageUrl}
      alt="Register background"
    />
  </div>
</main>

<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .register-section {
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

  .register-form {
    width: 100%;
    max-width: 600px;
  }

  h1 {
    margin-bottom: 2rem;
    color: #333;
    font-size: 2rem;
  }

  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .form-row .form-group {
    flex: 1;
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