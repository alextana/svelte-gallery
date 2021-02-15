<script>
  export let uploadStatus;
  export let imageURL;
  import { slide } from "svelte/transition";
</script>

{#if uploadStatus === "complete"}
  <div
    transition:slide
    class="upload__notification w-80 bg-gray-200 p-4 border border-gray-300 rounded-lg"
  >
    <div class="flex items-center">
      <div class="flex-initial">
        <img
          class="w-20 border border-gray-300 rounded-lg"
          src={imageURL}
          alt="Uploaded"
        />
      </div>
      <div class="flex-initial px-2">
        <span>Photo Uploaded Successfully</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .upload__notification {
    position: absolute;
    right: 50px;
    bottom: 50px;
  }
</style>
