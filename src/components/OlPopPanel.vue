<template>
  <div id="ol-pop-panel" v-show="isShowFeaInfoDiv">
    <div>
      <!-- <span>{{ typhoonData["intensity"] }}</span> -->
    </div>
    <div>
      <el-table :data="typhoonData" style="width: 100%">
        <el-table-column prop="attribute" width="180px" />
        <el-table-column prop="value" width="180px" />
      </el-table>
    </div>
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
import Select from "ol/interaction/Select";
import { click, pointerMove } from "ol/events/condition";
export default {
  name: "OlPopPanel",
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
    pointerMoveInfo() {
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
      const selectType = new Select({
        condition: pointerMove,
        style: highlightStyle,
      });

      let _this = this;
      this.map.addInteraction(selectType);
      selectType.on("select", function (e) {
        let selectedFea = e.selected[0];
        // debugger
      });
    },
  },
  watch: {
    map() {
      this.pointerMoveInfo();
    },
  },
};
</script>

<style lang="scss">
#ol-pop-panel {
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