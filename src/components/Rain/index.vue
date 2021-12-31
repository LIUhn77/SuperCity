<template>
  <el-button class="rain-button" @click="onClick">点我</el-button>
</template>

<script>
import { Feature } from "ol";
import { Stroke, Fill, Text, Style } from "ol/style";
import * as Source from "ol/source";
import * as Layer from "ol/layer";
import { Point, Polygon } from "ol/geom";
import rainData from "../../data/rain.json";
export default {
  name: "rainButton",
  data() {
    return {
      vectorSource: null,
    };
  },
  methods: {
    onClick() {
      let map = this.$parent.map;
      this.addPolygon();
    },

    addPolygon() {
      let map = this.$parent.map;
      let result = [];
      rainData.contours.map((v) => {
        let polygonArr = [];
        v.latAndLong.map((v2) => {
          polygonArr.push([v2[1], v2[0]]);
        });
        // 创建要素，设置其样式
        var feature = new Feature({
          geometry: new Polygon([polygonArr]),
        });
        var style = new Style({
          fill: new Fill({
            color: `rgba(${v.color.substr(
              0,
              v.color.lastIndexOf(",") + 1
            )}0.7)`,
          }),
        });
        feature.setStyle(style);
        result.push(feature);
      });

      this.vectorSource = new Source.Vector({
        features: result,
      });
      var vectorLayer = new Layer.Vector({
        source: this.vectorSource,
      });
      map.addLayer(vectorLayer);
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
      debugger;
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
.rain-button {
  height: 30px;
  width: 60px;
  background-color: aqua;
  position: fixed;
  z-index: 1;
  right: 0px;
}
</style>