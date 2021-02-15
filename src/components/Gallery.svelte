<script>
  import Splide from "@splidejs/splide";
  import UploadButton from "./UploadButton.svelte";
  import UploadNotification from "./UploadNotification.svelte";
  import Controls from "./Controls.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let fileInput, splide, uploadStatus, notificationTime, imageURL;
  // default controls
  let isAspectRatio,
    appFixedWidth,
    appFixedHeight,
    aspectRatio,
    widthAspectRatio,
    heightAspectRatio;
  // notification timeout value
  notificationTime = 2000;

  let isEnlarged = false;
  // default animal images
  let defaultImages = [
    "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/06/24/12/54/cat-5336074_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/03/27/07/31/pet-1282309_960_720.jpg",
  ];

  // init splide
  onMount(() => {
    splide = new Splide(".splide", {
      fixedWidth: "400px",
      fixedHeight: "400px",
      cover: true,
      perPage: 3,
      breakpoints: {
        550: {
          perPage: 1,
          fixedWidth: "280px",
        },
      },
      gap: "10px",
    }).mount();
  });

  // emitted event to destroy and reinitialise splider with new parameters
  /* there most likely is a better way of doing this without repeating this code but was unable to find a good way of doing it,
     I probably need more coffee
  */
  function changeSlider() {
    splide.destroy();
    if (isAspectRatio) {
      splide = new Splide(".splide", {
        fixedWidth: `${widthAspectRatio}px`,
        fixedHeight: `${heightAspectRatio}px`,
        cover: true,
        perPage: 3,
        gap: "10px",
        breakpoints: {
          550: {
            perPage: 1,
          },
        },
      }).mount();
    } else {
      splide = new Splide(".splide", {
        fixedWidth: `${appFixedWidth}px`,
        fixedHeight: `${appFixedHeight}px`,
        cover: true,
        perPage: 3,
        gap: "10px",
        breakpoints: {
          550: {
            perPage: 1,
          },
        },
      }).mount();
    }
  }

  // fileReader handler
  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      image = e.target.result;
      imageURL = image;
      // add slide after selecting an image
      defaultImages = [...defaultImages, imageURL];
    };
    reader.onloadstart = (e) => {
      uploadStatus = "in progress";
    };
    reader.onerror = (e) => {
      uploadStatus = "error";
    };
    reader.onloadend = (e) => {
      uploadStatus = "complete";
      splide.destroy();
      splide.mount();
      // move the slider to the latest uploaded image
      splide.go(splide.length - 1);
      // clear Complete after notificationTime
      setTimeout(function () {
        uploadStatus = "";
      }, notificationTime);
    };
  };

  // logic for the enlargement modal
  let setImage;
  function enlargeImage(i) {
    isEnlarged = true;
    setImage = defaultImages[i];
  }
</script>

<div class="container mx-auto px-3 lg:px-0">
  <Controls
    on:input={changeSlider}
    bind:aspectRatio
    bind:isAspectRatio
    bind:appFixedHeight
    bind:appFixedWidth
    bind:widthAspectRatio
    bind:heightAspectRatio
  />

  <div class="splide">
    <div class="splide__track">
      <ul class="splide__list">
        {#each defaultImages as images, i}
          <li on:click={() => enlargeImage(i)} class="splide__slide">
            <img src={images} alt="Animal {i}" />
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Custom Upload Button -->
  <UploadButton
    {uploadStatus}
    on:click={() => {
      fileInput.click();
    }}
  />

  <UploadNotification {uploadStatus} {imageURL} />

  <!-- hide input file to use custom button-->
  <input
    class="hidden"
    type="file"
    accept=".jpg,.jpeg,.png"
    on:change={(e) => onFileSelected(e)}
    bind:this={fileInput}
  />
</div>

{#if isEnlarged}
  <div
    transition:fade
    class="overlay"
    on:click={() => {
      isEnlarged = !isEnlarged;
    }}
  >
    <img src={setImage} alt="test" />
  </div>
{/if}

<style>
  .overlay {
    z-index: 999;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.7);
    cursor: pointer;
  }
  .overlay img {
    max-width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .splide {
    transition: 0.3s ease;
  }
</style>
