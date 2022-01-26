<template>
  <canvas id="wind-canvas"></canvas>
</template>

<script>
import { Windy } from "./Windy";
export default {
  data() {},
  mounted() {
    fetch(`/DataDir/Wind/wind.json`)
      .then((res) => res.json)
      .then((data) => {
          debugger
        let windy = new Windy({
          canvas: document.getElementById("wind-canvas"),
          data: data,
        });
      });
  },
};
</script>

<style>
</style>