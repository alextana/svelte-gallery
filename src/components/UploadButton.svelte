<script>
  export let uploadStatus;
  import { slide } from "svelte/transition";
</script>

<div
  on:click
  class="my-8 transition duration-300 ease-in-out mx-auto upload  hover:bg-blue-600 w-60 text-center p-3 text-white font-black uppercase rounded-full cursor-pointer active:bg-green-800 {uploadStatus ===
  'complete'
    ? 'loading-success'
    : 'bg-blue-500'}"
>
  {#if uploadStatus === "in progress"}
    <span transition:slide>Uploading...</span>
  {:else if uploadStatus === "complete"}
    <span transition:slide>Uploaded</span>
  {:else if uploadStatus === "error"}
    <span transition:slide>Error</span>
  {:else}
    <span transition:slide>Upload Image</span>
  {/if}
</div>

<style>
  div {
    display: block;
    transition: 0.5s ease;

    padding: 25px;
    position: relative;
  }
  span {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    position: absolute;
  }
  .loading-success {
    background: #2ecc71;
    width: 300px;
  }
</style>
