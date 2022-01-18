<template>
  <div id="ol-popup-panel">
    <div class="popup-title">
      <span>{{ typhoonTitle }}</span>
    </div>
    <span class="popup-item" v-for="(val, index) in featureInfo" :key="index">{{
      val.name + val.value
    }}</span>
    <hr v-if="isShowRadius">
    <el-table
      v-if="isShowRadius"
      :data="radiusData"
      style="width: 100%"
      class="popup-radius"
      :header-cell-style="{ padding: '2px 0', color: '#fff',background: '#465996' }"
      :cell-style="{ padding: '2px 0' ,background: '#465996', fontWeight:'100'}"
    >
      <el-table-column prop="radius" label="风圈半径" width="70" />
      <el-table-column prop="ne" label="东北" width="45" />
      <el-table-column prop="se" label="东南" width="45" />
      <el-table-column prop="sw" label="西南" width="45" />
      <el-table-column prop="nw" label="西北" width="45" />
    </el-table>
  </div>
</template>
    
<script>
import Overlay from "ol/Overlay";
export default {
  props: {
    hoverFeaData: Object,
  },
  data() {
    return {
      featureInfo: [],
      typhoonTitle: "",
      map: this.$parent.map,
      popup: null,
      /**是否显示风圈半径 */
      isShowRadius: false,
      radiusData: [],
    };
  },
  setup() {},
  mounted() {
    this.popup = new Overlay({
      element: document.getElementById("ol-popup-panel"),
      stopEvent: false,
    });
    this.map.addOverlay(this.popup);
  },
  methods: {
  },
  watch: {
    hoverFeaData: {
      handler(value) {
        this.$nextTick(() => {
          this.typhoonTitle = `${value.nameCN} - - - ${value.name}`;
          this.featureInfo = [
            {
              value: value.time,
              name: "当前时间：",
            },
            {
              value: `${value.longitude} °E | ${value.latitude} °N`,
              name: "中心位置：",
            },
            {
              value: value.speed + " m/s",
              name: "最大风速：",
            },
            {
              value: `${value.power}级 ${value.strong}`,
              name: "气旋强度：",
            },
            {
              value: value.pressure + " hPa",
              name: "中心气压：",
            },
            {
              value: value.move_dir,
              name: "移动方向：",
            },
            {
              value: value.move_speed + "km/h",
              name: "移动速度：",
            },
          ];
          //若七级风圈数据不为零，则显示风圈数据
          this.radiusData = [];
          if (value.radius7 != 0) {
            this.isShowRadius = true;
            this.radiusData.push({
              radius: "七级",
              ...value.radius7_quad,
            });
            if (value.radius10 != 0) {
              this.radiusData.push({
                radius: "十级",
                ...value.radius10_quad,
              });
            }
            if (value.radius12 != 0) {
              this.radiusData.push({
                radius: "十二级",
                ...value.radius12_quad,
              });
            }
          }else{
            this.isShowRadius=false
          }
          this.popup.setPosition([value.longitude, value.latitude]);
        });
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss">
#ol-popup-panel {
  background: #465996;
  background-clip: padding-box;
  border-color: #372d83;
  border-radius: 0;
  border-style: solid;
  border-width: 0;
  color: #fff;
  display: block;
  font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: bold;
  padding: 0;
  position: absolute;
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  .popup-title {
    line-height: 25px;
    background-color: #372d83;
    padding: 0px 10px;
    font-weight: bold;
  }
  .popup-item {
    font-weight: normal;
    margin: 5px 15px;
    display: flex;
    justify-content: left;
  }

  .popup-radius {
    color: white;
    font-size: 8px;
  }
}
</style>