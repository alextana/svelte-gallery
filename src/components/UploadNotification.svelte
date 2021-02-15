<script>
  import { fly } from "svelte/transition";
  export let uploadStatus;
  export let imageURL;
</script>

{#if uploadStatus === "complete"}
  <div
    transition:fly={{ x: 200 }}
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
    position: fixed;

    right: 50px;
    bottom: 50px;
  }
  @media (max-width: 550px) {
    .upload__notification {
      right: 0px;
    }
  }
</style>
