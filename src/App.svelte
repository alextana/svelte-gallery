<script>
  import Header from "./components/Header.svelte";
  import Gallery from "./components/Gallery.svelte";
</script>

<div>
  <main>
    <Header />
    <Gallery />
  </main>
</div>

<style global lang="postcss">
  body {
    overflow-x: hidden;
    overflow-y: scroll;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */
  @tailwind utilities;
  .splide__slide img {
    width: 100%;
    height: auto;
  }
  .splide__slide {
    border-radius: 8px;
    overflow: hidden;
  }
</style>
