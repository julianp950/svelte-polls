<script>
  export let type = "primary";
  export let flat = false;
  export let inverse = false;
</script>

<button class={type} class:flat class:inverse>
  <slot />
</button>

<style>
  button {
    font-weight: bold;
    border: 0;
    border-radius: 6px;
    padding: 8px 12px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  .primary {
    background: #d91b42;
    color: white;
  }
  .secondary {
    background: #45c496;
    color: white;
  }
  .primary.inverse {
    border: 2px solid #d91b42;
    background: white;
    color: #d91b42;
  }
  .secondary.inverse {
    border: 2px solid #45c496;
    background: white;
    color: #45c496;
  }
  .flat {
    box-shadow: none;
  }
</style>
