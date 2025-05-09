<script>
    import { onMount } from 'svelte';
    import { navigate } from "../lib/router.js";
    import { verifyToken } from '../lib/api.js';
  
    export let component; // Page to render if verified
  
    let isAuthenticated = false;
  
    onMount(async () => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        navigate('/');
        return;
      }
  
      try {
        await verifyToken(token);
        isAuthenticated = true;
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/');
      }
    });
  </script>
  
  {#if isAuthenticated}
    <svelte:component this={component} />
  {/if}
  