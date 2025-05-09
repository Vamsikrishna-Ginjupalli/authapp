<script>
  import { navigate } from "../lib/router.js";
  
  export let imageUrl = "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg";
  
  function goToLogin() {
    navigate("/");
  }
</script>

<main class="container">
  <div class="reset-section">
    <div class="reset-form">
      <h1>About this app</h1>
      <p>This is an authentication app </p>
      <p class="login-link">Back to login? <a href="/" on:click|preventDefault={goToLogin}>Login</a></p>
      
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

 

  .login-link a {
    color: #4a90e2;
    text-decoration: none;
  }

  .login-link a:hover {
    text-decoration: underline;
  }
</style>