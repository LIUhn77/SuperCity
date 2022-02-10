<template>
  <div id="cesiumContainer"></div>
  <Menu />
</template>

<script>
import Menu from "../Menu/index.vue";
import * as Cesium from "cesium";

export default {
  name: "Cesium",
  components: { Menu },
  setup() {},
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
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
      this.addClickEvent(viewer);
      this.add3DTiles_NYC(viewer);
      this.addClouds(viewer);
      return;
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
    /**加一朵云 */
    addClouds(viewer) {
      var clouds = new Cesium.CloudCollection();
      clouds.add({
        position: Cesium.Cartesian3.fromDegrees(
          -74.01881302800248,
          40.70854333714821,
          500
        ),
        scale: new Cesium.Cartesian2(1500, 250),
        maximumSize: new Cesium.Cartesian3(50, 15, 13),
        slice: 0.3,
      });
      clouds.add({
        position: Cesium.Cartesian3.fromDegrees(
          -74.00581302800248,
          40.71554333714821,
          553
        ),
        scale: new Cesium.Cartesian2(1000, 250),
        maximumSize: new Cesium.Cartesian3(50, 15, 13),
        slice: 0.5,
      });
      viewer.scene.primitives.add(clouds);
    },
    /**点击3DTiles时轮廓颜色 */
    addClickEvent(viewer) {
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      //应用轮廓效果的后期处理阶段 点击要素时显示轮廓
      var silhouetteBule =
        Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
      silhouetteBule.uniforms.color = Cesium.Color.BLUE;
      silhouetteBule.uniforms.length = 0.01;
      silhouetteBule.selected = [];
      var silhouettStage = Cesium.PostProcessStageLibrary.createSilhouetteStage(
        [silhouetteBule]
      );
      viewer.scene.postProcessStages.add(silhouettStage);

      handler.setInputAction((e) => {
        var pick = viewer.scene.pick(e.position);
        if (Cesium.defined(pick)) {
          silhouetteBule.selected = [pick];
          // pick.color=Cesium.Color.WHITE
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    /**添加纽约市3DTiles */
    add3DTiles_NYC(viewer) {
      var cityPrimitives = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: Cesium.IonResource.fromAssetId(3839),
        })
      );
      viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          -74.01881302800248,
          40.69114333714821,
          753
        ),
        orientation: {
          pitch: Cesium.Math.toRadians(-25),
          heading: Cesium.Math.toRadians(15),
          roll: 0.0,
        },
        duration: 1.5,
      });
      // viewer.zoomTo(city, new Cesium.HeadingPitchRange(0, -0.5, 0));
      
      var heightStyle = new Cesium.Cesium3DTileStyle({
        color: {
          conditions: [
            ["${height} >= 300", "rgba(45, 0, 75, 0.5)"],
            ["${height} >= 200", "rgb(102, 71, 151)"],
            ["${height} >= 100", "rgb(170, 162, 204)"],
            ["${height} >= 50", "rgb(224, 226, 238)"],
            ["${height} >= 25", "rgb(252, 230, 200)"],
            ["${height} >= 10", "rgb(248, 176, 87)"],
            ["${height} >= 5", "rgb(198, 106, 11)"],
            ["true", "rgb(127, 59, 8)"],
          ],
        },
      });
      cityPrimitives.style = heightStyle;
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