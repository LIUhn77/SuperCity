<template>
  <div id="ol-popup-panel">
    <div class="popup-title">
      <span >{{ typhoonTitle}}</span>
    </div>
    <!-- <div class="popup-item" v-for="(val, index) in featureInfo" :key="index">
      <span class="popup-item-name">{{ val.name }}</span>
      <span class="popup-item-value">{{ val.value }}</span>
    </div> -->
    <span class="popup-item" v-for="(val, index) in featureInfo" :key="index">{{
      val.name + val.value
    }}</span>
  </div>
</template>
    
<script>
export default {
  name: "OlPopPanel",
  props: {
    selectedFeaData: null,
  },
  data() {
    return {
      //信息窗口
      // isShowFeaInfoDiv: false,
      featureInfo: [],
      typhoonTitle:"",
      map: this.$parent.map,
    };
  },
  setup() {},
  mounted() {},
  methods: {},
  watch: {
    selectedFeaData: {
      handler(value) {
        this.typhoonTitle=`${value.nameCN} - - - ${value.name}`
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
    color: #FFF;
    display: block;
    font: 12px/1.5 "Helvetica Neue",Arial,Helvetica,sans-serif;
    font-weight: bold;
    padding: 0;
    position: absolute;
    user-select: none;
    pointer-events: none;
    white-space: nowrap;
  .popup-title{
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
    // color: rgba(250, 250, 250, 0.9);
    // margin: 2px;
    // .popup-item-name {
    //   display: inline-block;
    // }
    // .popup-item-value {
    //   display: inline-block;
    // }
  }
}
</style>