<script>
  import { navigate } from "../lib/router.js";
  
  let currentPage = 'page1';
  let showProfileMenu = false;
  
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  };

  function handleLogout() {
    navigate('/');
  }

  function toggleProfileMenu() {
    showProfileMenu = !showProfileMenu;
  }
</script>

<div class="dashboard">
  <nav class="sidebar">
    <div class="logo">
      <h2>Dashboard</h2>
    </div>
    <ul class="nav-links">
      <li>
        <button 
          class:active={currentPage === 'page1'} 
          on:click={() => currentPage = 'page1'}
        >
          Page 1
        </button>
      </li>
      <li>
        <button 
          class:active={currentPage === 'page2'} 
          on:click={() => currentPage = 'page2'}
        >
          Page 2
        </button>
      </li>
    </ul>
  </nav>

  <main class="main-content">
    <header class="top-bar">
      <div class="profile" on:click={toggleProfileMenu}>
        <img src={user.avatar} alt="Profile" class="avatar"/>
        <span class="user-name">{user.name}</span>
        {#if showProfileMenu}
          <div class="profile-menu">
            <div class="profile-info">
              <img src={user.avatar} alt="Profile" class="menu-avatar"/>
              <div class="user-details">
                <span class="name">{user.name}</span>
                <span class="email">{user.email}</span>
              </div>
            </div>
            <button class="logout-btn" on:click={handleLogout}>Logout</button>
          </div>
        {/if}
      </div>
    </header>

    <div class="content">
      {#if currentPage === 'page1'}
        <div class="page">
          <h1>Welcome to Page 1</h1>
          <div class="grid">
            <div class="card">
              <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" alt="Analytics"/>
              <h3>Analytics Overview</h3>
              <p>Track your performance and growth with detailed analytics.</p>
            </div>
            <div class="card">
              <img src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg" alt="Reports"/>
              <h3>Monthly Reports</h3>
              <p>Access comprehensive monthly performance reports.</p>
            </div>
          </div>
        </div>
      {:else}
        <div class="page">
          <h1>Welcome to Page 2</h1>
          <div class="grid">
            <div class="card">
              <img src="https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg" alt="Settings"/>
              <h3>Settings</h3>
              <p>Customize your dashboard preferences and notifications.</p>
            </div>
            <div class="card">
              <img src="https://images.pexels.com/photos/3183141/pexels-photo-3183141.jpeg" alt="Help"/>
              <h3>Help Center</h3>
              <p>Find answers to common questions and get support.</p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  .dashboard {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    width: 250px;
    background-color: #1a1a1a;
    color: white;
    padding: 1rem;
  }

  .logo {
    padding: 1rem;
    border-bottom: 1px solid #333;
    margin-bottom: 1rem;
  }

  .nav-links {
    list-style: none;
    padding: 0;
  }

  .nav-links button {
    width: 100%;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    color: white;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .nav-links button:hover,
  .nav-links button.active {
    background-color: #333;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
  }

  .top-bar {
    background-color: white;
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #ddd;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    position: relative;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .profile-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    width: 250px;
    margin-top: 0.5rem;
    z-index: 1000;
  }

  .profile-info {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    display: flex;
    gap: 1rem;
  }

  .menu-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-details {
    display: flex;
    flex-direction: column;
  }

  .name {
    font-weight: 500;
  }

  .email {
    font-size: 0.875rem;
    color: #666;
  }

  .logout-btn {
    width: 100%;
    padding: 0.75rem;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
  }

  .logout-btn:hover {
    background-color: #f5f5f5;
  }

  .content {
    padding: 2rem;
    overflow-y: auto;
  }

  .page {
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    margin-bottom: 2rem;
    color: #333;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card h3 {
    padding: 1rem;
    margin: 0;
  }

  .card p {
    padding: 0 1rem 1rem;
    color: #666;
    margin: 0;
  }
</style>