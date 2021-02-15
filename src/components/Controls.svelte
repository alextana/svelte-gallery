<script>
  import { slide } from "svelte/transition";
  import Close from "./icons/Close.svelte";
  import Settings from "./icons/Settings.svelte";

  export let appFixedHeight,
    appFixedWidth,
    aspectRatio = 1,
    widthAspectRatio,
    heightAspectRatio,
    // used to check whether the aspect ratio checkbox is checked or not
    isAspectRatio = false,
    defaultDimensions = 400,
    controls = false;
  // default width and height
  appFixedWidth = defaultDimensions;
  appFixedHeight = defaultDimensions;

  // aspect ratio handler
  function handleAspectRatio() {
    isAspectRatio = !isAspectRatio;
    if (isAspectRatio) {
      // reset height to lock in default width for aspect ratio calculation
      appFixedHeight = defaultDimensions;
      appFixedWidth = defaultDimensions;
    }
  }
  // determine new width to calculate height
  let newWidth = appFixedWidth * aspectRatio;
  $: widthAspectRatio = appFixedWidth * aspectRatio;
  // calculate new height using new width
  $: heightAspectRatio = (appFixedHeight / appFixedWidth) * newWidth;
  // determine aspect ratio
  aspectRatio = appFixedWidth / appFixedHeight;
</script>

<div
  class="block ml-auto text-right py-4 cursor-pointer font-black text-gray-600"
  on:click={() => (controls = !controls)}
>
  {#if controls}
    Close Controls <Close height={24} width={24} />
  {:else}
    Open Controls <Settings height={24} width={24} />
  {/if}
</div>

{#if controls}
  <div
    class="bg-gray-100 rounded-lg border border-gray-300 m-auto text-center p-4 mb-4"
    transition:slide
  >
    <div class="pb-4">
      <div class="py-2">
        <div class="input inline mx-2">
          <label class="font-bold" for="noAspectRatio">Edit Aspect Ratio</label>
          <input
            id="noAspectRatio"
            type="checkbox"
            name="aspectRatioCheckbox"
            on:change={handleAspectRatio}
            bind:checked={isAspectRatio}
          />
        </div>
      </div>
    </div>
    {#if isAspectRatio}
      <div class="flex justify-center items-center">
        <label class="flex-initial mr-2 font-bold" for="AspectRatio"
          >Aspect Ratio:</label
        >
        <input
          type="range"
          min={1}
          max={7}
          bind:value={aspectRatio}
          class="slider flex-initial"
          id="AspectRatio"
          step={0.01}
          on:input
        />
        <span class="ml-2">{aspectRatio}</span>
      </div>
    {:else}
      <div class="flex justify-center items-center">
        <label class="flex-initial mr-2 font-bold" for="Width">Width: </label>
        <input
          type="range"
          min={100}
          max={900}
          bind:value={appFixedWidth}
          class="slider flex-initial"
          id="Width"
          step={1}
          on:input
        />
        <span class="ml-2">{appFixedWidth}px</span>
      </div>

      <div class="flex justify-center items-center">
        <label class="flex-initial mr-2 font-bold" for="Height">Height: </label>
        <input
          type="range"
          min={100}
          max={900}
          bind:value={appFixedHeight}
          class="slider flex-initial"
          id="Height"
          step={1}
          on:input
        />
        <span class="ml-2">{appFixedHeight}px</span>
      </div>
    {/if}
  </div>
{/if}

<style>
  label {
    display: inline;
  }
</style>
