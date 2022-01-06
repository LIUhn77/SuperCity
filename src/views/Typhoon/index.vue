<template>
<!-- <div id="popup" title="Welcome to OpenLayers"></div> -->
  <div class="typhoon-panel">
    <div>
      <div class="typhoon-panel-title">
        <span>台风列表</span>
      </div>
      <el-table
        :data="typhoonList"
        style="width: 100%"
        max-height="300"
        :header-cell-style="{ padding: '2px 0', color: '#4d94f8' }"
        :cell-style="{ padding: '2px 0' }"
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
  <OlPopPanel v-show="isShowOlPopPanel" :selectedFeaData="selectedFeaData" />
</template> 
<script>
import { Feature } from "ol";
import { Stroke, Fill, Text, Style, Circle } from "ol/style";
import * as Source from "ol/source";
import * as Layer from "ol/layer";
import { LineString, Point, Polygon } from "ol/geom";
import typhoonConfig from "./typhoonConfig.js";
import OlPopPanel from "./OlPopPanel.vue";
import Select from "ol/interaction/Select";
import { click, pointerMove } from "ol/events/condition";
import Overlay from "ol/Overlay";

export default {
  name: "typhoonButton",
  components: { OlPopPanel },
  props: {},
  data() {
    return {
      map: this.$parent.$parent.map,
      /**台风列表 */
      typhoonList: [],
      /**台风数据数组 */
      typhoonData: [],
      /**台风图层 */
      typhoonLayers: new Map(),
      /**台风Select */
      typhoonSelects: new Map(),
      /**是否弹出台风属性窗口 */
      isShowOlPopPanel: false,
      /**选中属性信息 */
      selectedFeaData: {},
    };
  },
  mounted() {
    let _this = this;
    fetch(`/DataDir/Typhoon/index.json`)
      .then((res) => res.json())
      .then((data) => {
        _this.typhoonList = data;
      });
  },
  watch: {
  },
  methods: {
    /**
     * 台风列表勾选事件
     */
    async handleSelect(selection, row) {
      let isCheck = selection.includes(row);
      if (isCheck) {
        //勾选增加要素
        let data = await fetch(`/DataDir/Typhoon/${row.id}.json`).then((res) =>
          res.json()
        );
        let layer = this.addTyphoonFea(data);
        this.typhoonLayers.set(data.nno, layer);
        let select = this.addInteraction(layer);
        this.typhoonSelects.set(row.id, select);
      } else {
        //取消勾选删除要素
        if (this.typhoonLayers.has(row.id)) {
          this.map.removeInteraction(this.typhoonSelects.get(row.id));
          this.map.removeLayer(this.typhoonLayers.get(row.id));
          this.typhoonLayers.delete(row.id);
          this.typhoonSelects.delete(row.id);
        }
      }
    },

    /**
     * 绑定鼠标移动至要素时事件
     */
    addInteraction(layer) {
      const popup = new Overlay({
        element: document.getElementById("ol-popup-panel"),
      });
      this.map.addOverlay(popup);

      const highlightStyle = new Style({
        image: new Circle({
          radius: 10, //半径
          fill: new Fill({
            color: "#555555",
          }),
          stroke: new Stroke({
            //边界样式
            color: "#555555",
            width: 1,
          }),
        }),
      });
      const selectType = new Select({
        condition: pointerMove,
        style: highlightStyle,
        layers: [layer],
      });
      this.map.addInteraction(selectType);
      let _this = this;
      selectType.on("select", function (e) {
        if (e.selected.length == 0) return;
        let selectedFea=e.selected[0].values_;
        if(!selectedFea.hasOwnProperty('level')) return
        _this.selectedFeaData = selectedFea;
        popup.setPosition([selectedFea.longitude,selectedFea.latitude]);
        _this.isShowOlPopPanel = true;
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
        pointFea.setStyle(this.setPointStyle(color));
        pointFea.setProperties({ 
          level: "typhoon", 
          nameCN:data.name,
          id:data.nno,
          name:data.ename,
          ...v 
          });
        //线
        if (lineArr.length == 2) {
          var lineFea = new Feature({
            geometry: new LineString(lineArr),
          });
          lineArr = [curPoint];
          lineFea.setStyle(this.setLineStyle(color));
          featuresArr.push(lineFea);
        }
        featuresArr.push(pointFea);
      });

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

    /**
     * 添加台风路径（点、线） 中央气象台台风网数据
     *
     */
    addTyphoonFea2(data) {
      let map = this.$parent.$parent.map;
      debugger;
      let lineArr = [];
      let featuresArr = []; //元素数组，包括点和线
      data.typhoon[8].map((v) => {
        let prop = this.getTyphoonProperties(v);
        const curPoint = [prop["lng"], prop["lat"]]; //当前坐标数组
        lineArr.push(curPoint);
        //点
        var pointFea = new Feature({
          geometry: new Point(curPoint),
        });
        pointFea.setStyle(this.setPointStyle(prop["color"]));
        pointFea.setProperties(prop);
        //线
        if (lineArr.length == 2) {
          var lineFea = new Feature({
            geometry: new LineString(lineArr),
          });
          lineArr = [curPoint];
          lineFea.setStyle(this.setLineStyle(prop["color"]));
          featuresArr.push(lineFea);
        }

        featuresArr.push(pointFea);
      });

      let vectorSource = new Source.Vector({
        features: featuresArr,
      });
      var vectorLayer = new Layer.Vector({
        source: vectorSource,
      });
      map.addLayer(vectorLayer);
    },

    /**
     * 处理台风数据 中央气象台台风网数据
     * @param {object} value 台风数据
     */
    getTyphoonProperties2(value) {
      const { color, intensity } = typhoonConfig(value[3]);
      let prop = {
        level: "typhoon",
        //强度
        intensity: intensity,
        //中心位置 - 经度
        lng: value[4],
        //中心位置 - 纬度
        lat: value[5],
        //中心气压 hPa
        airPressure: value[6],
        //最大风速 m/s
        windSpeed: value[7],
        //移动速度 km/h
        moveSpeed: value[9],
        //移动方向
        moveDirection: value[8],
        //风圈 热带低压无风圈
        olarOrLunarHalo: null,
        //台风预测路径
        predictPath: null,
        //时间
        time: "",
        timeCN: "",
        //渲染颜色
        color: color,
      };
      if (intensity != "热带低压") {
        prop["olarOrLunarHalo"] = value[10];
        prop["predictPath"] = value[11];
        prop["time"] = value[(12)[0]];
        prop["timeCN"] = value[(12)[1]];
      } else {
        prop["predictPath"] = value[10];
        prop["time"] = value[(11)[0]];
        prop["timeCN"] = value[(11)[1]];
      }
      return prop;
    },

    /**
     * 设置台风点样式
     * @param {string} 颜色 如rgb(0,0,0)
     * @returns ol.Style
     */
    setPointStyle(color) {
      let style = new Style({
        image: new Circle({
          radius: 3, //半径
          fill: new Fill({
            color: color,
          }),
          stroke: new Stroke({
            //边界样式
            color: "#555555",
            width: 1,
          }),
        }),
      });
      return style;
    },

    /**
     * 设置台风线样式
     * @param {string} 颜色 如rgb(0,0,0)
     * @returns ol.Style
     */
    setLineStyle(color) {
      let style = new Style({
        stroke: new Stroke({
          color: color, //颜色
          width: 2, //宽度
        }),
      });
      return style;
    },

    /**添加点 */
    addPoints() {
      let map = this.$parent.map;
      map.on("click", function (evt) {
        var coordinate = evt.coordinate; //鼠标单击点的坐标
        console.log(coordinate);
        //新建一个要素ol.Feature
        var newFeature = new Feature({
          geometry: new Point(coordinate), //几何信息
          name: "标注点",
        });
        newFeature.setStyle(this.createLabelStyle(newFeature)); //设置要素样式
        this.vectorSource.addFeature(newFeature);
      });
      let result = [];
      let a = { color: [], value: [], symbol: [] };
      rainData.contours.map((v) => {
        a.color.push(v.color);
        a.value.push(v.value);
        a.symbol.push(v.symbol);
        v.latAndLong.map((v2) => {
          var iconFeature = new Feature({
            geometry: new Point([v2[1], v2[0]]),
            name: ">", //名称属性
            population: 2115, //人口数（万）
          });
          iconFeature.setStyle(this.createLabelStyle(iconFeature));
          result.push(iconFeature);
        });
      });
      this.vectorSource = new Source.Vector({
        features: result,
      });
      var vectorLayer = new Layer.Vector({
        source: this.vectorSource,
      });
      map.addLayer(vectorLayer);
    },

    /**点样式 */
    createLabelStyle(feature) {
      return new Style({
        text: new Text({
          textAlign: "center", //位置
          textBaseline: "middle", //基准线
          font: "normal 14px 微软雅黑", //文字样式
          text: feature.get("name"), //文本内容
          fill: new Fill({
            //文本填充样式（即文字颜色)
            color: "#000",
          }),
          stroke: new Stroke({
            color: "#F00",
            width: 2,
          }),
        }),
      });
    },
  },
};
</script>

<style lang="scss">
.typhoon-panel {
  width: 300px;
  height: 100%;
  min-height: 640px;
  position: absolute;
  top: 0;
  left: 70px;
  background-color: white;
  border: 1px solid black;
  .typhoon-panel-title {
    color: #166abe;
    background-color: #f3f4f7;
    border: 1px solid #adadad;
  }
}
</style>