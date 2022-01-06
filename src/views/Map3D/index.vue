<template>
  <div id="cesiumContainer"></div>
  <Menu current="cesium" />
</template>

<script>
import { getCurrentInstance } from "vue";
import Menu from "../Menu/index.vue"

export default {
  name: "Cesium",
  components: { Menu },
  setup() {},
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const { proxy } = getCurrentInstance();
      const Cesium = proxy.$Cesium;
      var viewer = new Cesium.Viewer("cesiumContainer", {
        selectionIndicator: false,
        infoBox: false,
        animation: false,
        fullscreenButton: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        shadows: false,
        terrainShadows: 1,
        terrainProvider: new Cesium.EllipsoidTerrainProvider(),
        // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        //   url: `https://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=f80321b35256f12df8e112516b6f22f5`,
        // }),
        // clockViewModel: new Cesium.ClockViewModel(clock),
      });
      // 开启深度测试
      viewer.scene.globe.depthTestAgainstTerrain = true;
      //开启快速抗锯齿
      viewer.scene.postProcessStages.fxaa.enabled = true;
      // 隐藏商标
      viewer.bottomContainer.style.visibility = "hidden";
      //视角
      viewer.camera.setView({
        // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
        // fromDegrees()方法，将经纬度和高程转换为世界坐标
        destination: Cesium.Cartesian3.fromDegrees(
          113.564839,
          22.948857,
          200000.0
        ),
        orientation: {
          // 指向
          heading: Cesium.Math.toRadians(0, 0),
          // 视角
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0,
        },
      });
    },
  },
};
</script>

<style lang="scss">
#cesiumContainer {
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>