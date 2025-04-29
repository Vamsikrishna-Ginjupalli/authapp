<script>
  export let label = "";
  export let type = "text";
  export let value = "";
  export let placeholder = "";
  export let error = "";
  export let required = false;
</script>

<div class="form-field">
  <label for={label.toLowerCase().replace(/\s+/g, '-')}>
    {label}
    {#if required}
      <span class="required">*</span>
    {/if}
  </label>
  
  <input
    {type}
    id={label.toLowerCase().replace(/\s+/g, '-')}
    bind:value
    {placeholder}
    class={error ? "input-error" : ""}
  />
  
  {#if error}
    <div class="error-message">{error}</div>
  {/if}
</div>

<style>
  .form-field {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .required {
    color: var(--error-color);
    margin-left: 0.25rem;
  }

  .input-error {
    border-color: var(--error-color);
  }

  .error-message {
    color: var(--error-color);
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
</style>