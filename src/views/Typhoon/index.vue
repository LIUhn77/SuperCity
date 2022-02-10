<template>
  <div class="typhoon-panel">
    <div class="typhoon-panel-list">
      <div class="typhoon-panel-title">
        <span>台风列表</span>
      </div>
      <div class="typhoon-panel-list-item">
        <el-table
          v-loading="isLoading"
          element-loading-text="加载中..."
          :data="typhoonList"
          :max-height="typhoonListHeight"
          :header-cell-style="{ padding: '0 0', color: '#4d94f8' }"
          :cell-style="{ padding: '0 0' }"
          @select="handleSelect"
        >
          <el-table-column type="selection" width="30" />
          <el-table-column prop="id" label="编号" width="70" />
          <el-table-column prop="nameCN" label="中文名" width="80" />
          <el-table-column
            prop="name"
            label="英文名"
            show-overflow-tooltip
            width="120"
          />
        </el-table>
      </div>
    </div>
    <TyphoonDataPanel
      v-if="isCheckedItem"
      :selectTyphoonData="getPanelTyphoonData"
    />
    <TyphoonChart v-if="isCheckedItem" :chartsData="getPanelTyphoonData" />
  </div>

  <TyphoonHover v-if="isShowOlPopPanel" :hoverFeaData="hoverFeaData" />
  <TyphoonSelect
    v-for="(value, index) in typhoonData"
    :selectedFeaData="value[1]"
    :key="index"
  />
</template> 
<script>
import { Feature } from "ol";
import * as Source from "ol/source";
import * as Layer from "ol/layer";
import { LineString, Point, Polygon } from "ol/geom";
import Select from "ol/interaction/Select";
import { click, pointerMove } from "ol/events/condition";

import typhoonConfig from "./typhoonConfig.js";
import TyphoonHover from "./TyphoonHover.vue";
import TyphoonSelect from "./TyphoonSelect.vue";
import TyphoonDataPanel from "./TyphoonDataPanel.vue";
import TyphoonChart from "./TyphoonChart.vue";
import { setPointStyle, setLineStyle, createLabelStyle } from "./Function.js";

export default {
  name: "typhoon",
  components: { TyphoonHover, TyphoonSelect, TyphoonDataPanel, TyphoonChart },
  props: {},
  data() {
    return {
      map: this.$parent.$parent.map,
      /**台风列表 */
      typhoonList: [],
      typhoonListHeight: "100%",
      /**所有勾选的台风 panel展示数据、layer、selcet等 */
      typhoonObjectArr: [],
      /**台风选中要素 id-selectFeature */
      typhoonData: new Map(),
      /**是否弹出台风属性窗口 */
      isShowOlPopPanel: false,
      /**选中属性信息 */
      selectedFeaData: {},
      /**点击时展示旋转台风图标 */
      isShowTyphoonMarker: false,
      hoverFeaData: {},
      isLoading: false,
    };
  },
  mounted() {
    /**初始化时获取台风列表 */
    let _this = this;
    this.isLoading = true;
    fetch(`/DataDir/Typhoon/index.json`)
      .then((res) => res.json())
      .then((data) => {
        _this.typhoonList = data;
        _this.isLoading = false;
      });
  },
  watch: {},
  methods: {
    /**
     * 台风列表勾选事件
     */
    handleSelect(selection, row) {
      let isCheck = selection.includes(row);
      if (isCheck) {
        this.selectTyphoon(row.id);
      } else {
        this.deSelectTyphoon(row.id);
      }
    },

    /**
     * 勾选某台风
     * @param {String} id 选中台风编号
     */
    async selectTyphoon(id) {
      this.isLoading = true;
      let data = await fetch(`/DataDir/Typhoon/${id}.json`).then((res) =>
        res.json()
      );
      let layer = this.addTyphoonFea(data);
      let select = this.addMoveInteraction(layer);
      let selectMarker = this.addClickInteraction(layer);
      this.typhoonData.set(id, {
        id: id,
        ...data.points.slice(-1)[0],
      });
      let typhoonObject = {
        id: id,
        layer: layer,
        data: data,
        mapSelect: [select, selectMarker],
      };
      this.typhoonObjectArr.push(typhoonObject);
      this.isLoading = false;
      if (this.typhoonObjectArr.length == 1) {
        this.typhoonListHeight = "200px";
      }
    },

    /**
     * 取消勾选某台风
     * @param {String} id 取消勾选台风编号
     */
    deSelectTyphoon(id) {
      let index = this.typhoonObjectArr.findIndex((v) => v.id == id);
      let deSelectData = this.typhoonObjectArr[index];
      deSelectData.mapSelect.map((interaction) => {
        this.map.removeInteraction(interaction);
      });
      this.map.removeLayer(deSelectData.layer);
      this.typhoonObjectArr.splice(index, 1);
      this.typhoonData.delete(id);
      if (this.typhoonObjectArr.length == 0) {
        this.typhoonListHeight = "100%";
      }
    },

    /**
     * 绑定鼠标移动至要素时事件
     * @abstract 为什么不用map.on（）绑定移动事件能---通过实际操作发现这种方法卡顿感强
     */
    addMoveInteraction(layer) {
      const selectType = new Select({
        condition: pointerMove,
        layers: [layer],
      });
      this.map.addInteraction(selectType);
      let _this = this;
      selectType.on("select", function (e) {
        if (e.selected.length == 0) {
          //当移出要素时不显示信息窗口
          _this.isShowOlPopPanel = false;
          return;
        }
        let selectedFea = e.selected[0].values_;
        if (!selectedFea.hasOwnProperty("level")) return;
        _this.hoverFeaData = selectedFea;
        _this.isShowOlPopPanel = true;
      });
      return selectType;
    },

    /**
     * 绑定鼠标点击要素时事件
     */
    addClickInteraction(layer) {
      const selectType = new Select({
        layers: [layer],
      });
      this.map.addInteraction(selectType);
      let _this = this;
      selectType.on("select", function (e) {
        if (e.selected.length == 0) return;
        let selectedFea = e.selected[0].values_;
        if (!selectedFea.hasOwnProperty("level")) return;
        _this.isShowTyphoonMarker = true;
        _this.selectedFeaData = selectedFea;
        if (_this.typhoonData.get(selectedFea.id)) {
          _this.typhoonData.delete(selectedFea.id);
        }
        _this.typhoonData.set(selectedFea.id, selectedFea);
      });
      return selectType;
    },

    /**
     * 处理台风数据 实时台风网数据
     * @param {object} value 台风数据
     * @returns Layer
     */
    addTyphoonFea(data) {
      let lineArr = [];
      let featuresArr = []; //元素数组，包括点和线
      data.points.map((v) => {
        const curPoint = [v.longitude, v.latitude]; //当前坐标数组
        const color = typhoonConfig(v.strong); //渲染的电线颜色
        lineArr.push(curPoint);
        //点
        var pointFea = new Feature({
          geometry: new Point(curPoint),
        });
        pointFea.setStyle(setPointStyle(color));
        pointFea.setProperties({
          level: "typhoon",
          nameCN: data.name,
          id: data.nno,
          name: data.ename,
          ...v,
        });
        //线
        if (lineArr.length == 2) {
          var lineFea = new Feature({
            geometry: new LineString(lineArr),
          });
          lineArr = [curPoint];
          lineFea.setStyle(setLineStyle(color));
          featuresArr.push(lineFea);
        }
        featuresArr.push(pointFea);
      });
      //文本
      var feaTyphoonName = new Feature({
        geometry: new Point([
          data.points[0].longitude,
          data.points[0].latitude,
        ]),
      });
      feaTyphoonName.setStyle(createLabelStyle(data.name));
      featuresArr.push(feaTyphoonName);
      let vectorSource = new Source.Vector({
        features: featuresArr,
      });
      var vectorLayer = new Layer.Vector({
        source: vectorSource,
        className: "typhoon-" + data.ename,
      });
      this.map.addLayer(vectorLayer);
      return vectorLayer;
    },
  },
  computed: {
    /**验证是否有勾选的台风 */
    isCheckedItem() {
      return !!this.typhoonObjectArr.length;
    },
    /**获取最新勾选的台风数据 */
    getPanelTyphoonData() {
      return this.typhoonObjectArr[this.typhoonObjectArr.length - 1].data;
    },
  },
  beforeUnmount() {
    //组件销毁时清除台风
    this.typhoonObjectArr.forEach((v) => {
      this.map.removeLayer(v.layer);
    });
  },
};
</script>

<style lang="scss">
@keyframes fadenum {
  0% {
    transform: translateY(500px);
  }
}
.typhoon-panel {
  width: 300px;
  height: 100%;
  min-height: 640px;
  position: absolute;
  top: 0;
  left: 70px;
  background-color: white;
  border: 1px solid black;
  animation: fadenum 0.5s;

  .typhoon-panel-title {
    color: #166abe;
    background-color: #f3f4f7;
    border: 1px solid #adadad;
  }
}
</style>