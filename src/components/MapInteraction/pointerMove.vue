<template>
  <div id="feature-info-div" v-show="isShowFeaInfoDiv">
    <span
      class="feature-item"
      v-for="(val, index) in featureInfo"
      :key="index"
      >{{ val }}</span
    >
  </div>
</template>
    
<script>
import { Fill, Stroke, Style } from "ol/style";

export default {
  name: "pointerMove",
  props: {
    map: {},
  },
  data() {
    return {
      //信息窗口
      isShowFeaInfoDiv: false,
      featureInfo: [],
    };
  },
  setup() {},
  mounted() {},
  methods: {
    addPointermoveEventListener() {
      let selectedFea = null;
      //悬停时的样式
      const highlightStyle = new Style({
        fill: new Fill({
          color: "rgba(220, 220, 220, 1)",
        }),
        stroke: new Stroke({
          color: "blue",
          width: 3,
        }),
      });
      let feaInfoDiv = document.getElementById("feature-info-div");
      let olContainer = document.getElementById("olContainer");
      //"pointermove"  监听鼠标移动事件，略卡顿
      // this.map.on("singleclick", (e) => {
      //   if (selectedFea !== null) {
      //     selectedFea.setStyle(undefined);
      //     selectedFea = null;
      //   }
      //   let feature = this.map.forEachFeatureAtPixel(
      //     e.pixel,
      //     (feature) => feature
      //   );
      //   if (feature) {
      //     this.featureInfo = [];
      //     this.featureInfo.push("城市：" + feature.values_.name);
      //     this.featureInfo.push("编号：" + feature.values_.adcode);
      //     this.featureInfo.push("经度：" + feature.values_.center[0]);
      //     this.featureInfo.push("纬度：" + feature.values_.center[1]);
      //     selectedFea = feature;
      //     selectedFea.setStyle(highlightStyle);

      //     //跟随移动的信息框
      //     this.isShowFeaInfoDiv = true;
      //     olContainer.style.cursor = "pointer";
      //     feaInfoDiv.style.left = e.pixel[0] + 5 + "px";
      //     feaInfoDiv.style.top = e.pixel[1] - 100 + "px";
      //   } else {
      //     olContainer.style.cursor = "default";
      //     this.isShowFeaInfoDiv = false;
      //   }
      // });
    },
  },
  watch: {
    map() {
      this.addPointermoveEventListener();
    },
  },
};
</script>

<style lang="scss">
#feature-info-div {
  border-radius: 8px;
  display: grid;
  position: absolute;
  z-index: 1;
  text-align: initial;
  padding: 10px;
  background-color: rgba(50, 50, 50, 0.7);
  font-size: 13px;
  .feature-item {
    color: rgba(236, 234, 76, 0.9);
    margin: 2px;
  }
}
</style>