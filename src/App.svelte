<script>
  import { currentPath } from './lib/router.js';
  import Login from './components/Login.svelte';
  import Register from './components/Register.svelte';
  import Reset from './components/Reset.svelte';
  import Dashboard from './components/Dashboard.svelte';
  import About from './components/about.svelte';
  import ResetPassword from './components/ResetPassword.svelte';
  import ProtectedRoute from './components/ProtectedRoute.svelte';
</script>

<main>
  {#if $currentPath === '/'}
    <Login />
  {:else if $currentPath === '/about'}
    <About />
  {:else if $currentPath === '/register'}
    <Register />
  {:else if $currentPath === '/reset'}
    <Reset />
  {:else if $currentPath === '/reset/:token'}
    <ResetPassword />
  {:else if $currentPath === '/dashboard'}
    <ProtectedRoute component={Dashboard} />
  {:else}  
    <Login />
  {/if}
</main>