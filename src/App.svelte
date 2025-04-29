<script>
  import { currentPath } from './lib/router.js';
  import Login from './components/Login.svelte';
  import Register from './components/Register.svelte';
  import Reset from './components/Reset.svelte';
  import Dashboard from './components/Dashboard.svelte';
</script>

<main>
  {#if $currentPath === '/'}
    <Login />
  {:else if $currentPath === '/register'}
    <Register />
  {:else if $currentPath === '/reset'}
    <Reset />
  {:else if $currentPath === '/dashboard'}
    <Dashboard />
  {:else}
    <Login />
  {/if}
</main>