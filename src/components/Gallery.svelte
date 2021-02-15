<script>
  import Splide from "@splidejs/splide";
  import UploadButton from "./UploadButton.svelte";
  import UploadNotification from "./UploadNotification.svelte";
  import { onMount } from "svelte";
  let displayedImage,
    fileInput,
    splide,
    uploadStatus,
    notificationTime,
    imageURL;
  notificationTime = 2000;
  // default animal images
  let defaultImages = [
    "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/06/24/12/54/cat-5336074_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/07/20/21/00/sloth-2523765_960_720.jpg",
  ];

  // init splide
  onMount(() => {
    splide = new Splide(".splide", {
      fixedHeight: "300px",
      perPage: 3,
      cover: true,
      gap: "10px",
    }).mount();
  });

  // fileReader handler
  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      image = e.target.result;
      imageURL = image;
      // add slide after selecting an image
      splide.add(`<li class="splide__slide"><img src=${image}></li>`);
      splide.go(splide.length - 1);
    };
    reader.onloadstart = (e) => {
      uploadStatus = "in progress";
    };
    reader.onerror = (e) => {
      uploadStatus = "error";
    };
    reader.onloadend = (e) => {
      uploadStatus = "complete";
      // clear Complete after notificationTime
      setTimeout(function () {
        uploadStatus = "";
      }, notificationTime);
    };
  };
</script>

<div>
  <div class="splide">
    <div class="splide__track">
      <ul class="splide__list">
        {#each defaultImages as images, i}
          <li class="splide__slide">
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
