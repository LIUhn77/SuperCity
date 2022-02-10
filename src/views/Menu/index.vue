<template>
  <div id="menu">
    <MenuItem
      itemName="台风"
      image="/DataDir/images/Typhoon.png"
      @click="onTyphoonClick"
    />
    <MenuItem
      itemName="降雨"
      image="/DataDir/images/Rain.png"
      @click="onRainClick"
    />
    <MenuItem
      itemName="轨迹"
      image="/DataDir/images/Rain.png"
      @click="onFlightClick"
    />
    <TyphoonPanel v-if="isShowTyphoon" />
    <RainPanel v-if="isShowRain" />
    <SwitchButton :to="to" :content="content" @click="switchMapClick" />
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";
import SwitchButton from "./SwitchButton.vue";
import TyphoonPanel from "../Typhoon/index.vue";
import RainPanel from "../Rain/index.vue";
import { addFlightToMap } from "../Flight/index.js";
import { useStore } from "vuex";
export default {
  name: "Menu",
  props: {},
  components: { MenuItem, TyphoonPanel, SwitchButton, RainPanel },
  data() {
    return {
      store: useStore(),
      to: "/Map3D",
      content: "切换至三维",
      isShowTyphoon: false,
      isShowRain: false,
    };
  },
  mounted() {
    if (this.store.state.currentMap == "ol") {
      this.to = "/Map3D";
      this.content = "切换至三维";
    } else {
      this.to = "/Map2D";
      this.content = "切换至二维";
    }
  },
  methods: {
    onTyphoonClick() {
      this.isShowTyphoon = !this.isShowTyphoon;
      this.isShowRain = this.isShowTyphoon ? false : this.isShowRain;
    },
    onRainClick() {
      this.isShowRain = !this.isShowRain;
      this.isShowTyphoon = this.isShowRain ? false : this.isShowTyphoon;
    },
    onFlightClick() {
      this.isShowTyphoon = false;
      this.isShowRain = false;
      addFlightToMap(this.$parent.map);
    },
    switchMapClick() {
      debugger;
      if (this.store.state.currentMap == "ol") {
        this.store.commit("setCurrentMap", "cesium");
        this.to = "/Map2D";
        this.content = "切换至二维";
      } else {
        this.store.commit("setCurrentMap", "ol");
        this.to = "/Map3D";
        this.content = "切换至三维";
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss">
#menu {
  width: 70px;
  height: 100%;
  min-height: 640px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background: #323232;
}
</style>