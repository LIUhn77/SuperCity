<template>
  <div id="menu">
    <MenuItem
      itemName="台风"
      image="/DataDir/images/Typhoon.png"
      @click="onTyphoonClick"
    />
    <MenuItem itemName="降雨" image="/DataDir/images/Rain.png" />
    <MenuItem itemName="风场" image="/DataDir/images/Rain.png" @click="onWindClick"/>
    <TyphoonPanel v-if="isShowTyphoon"/>
    <Wind v-if="isShowWind" />
    <SwitchButton :to="to" :content="content" @click="switchMapClick" />
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";
import SwitchButton from "./SwitchButton.vue";
import TyphoonPanel from "../Typhoon/index.vue";
import Wind from "../Wind/index.vue"
export default {
  name: "Menu",
  props: {
    current: "",
  },
  components: { MenuItem, TyphoonPanel, SwitchButton,Wind },
  data() {
    return {
      currentMap: this.current,
      to: "/Map3D",
      content: "切换至三维",
      isShowTyphoon: false,
      isShowWind:false
    };
  },
  mounted() {
    if (this.currentMap == "ol") {
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
    },
    onWindClick(){
      this.isShowWind=!this.isShowWind;
    },
    switchMapClick() {
      if (this.currentMap == "ol") {
        this.to = "/Map2D";
        this.content = "切换至二维";
      } else {
        this.to = "/Map3D";
        this.content = "切换至三维";
      }
    },
  },
  watch: {
    currentMap(val) {
      debugger;
    },
    isShowTyphoon(val) {
      if (val) {
      } else {
      }
    },
  },
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