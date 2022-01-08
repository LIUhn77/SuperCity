<template>
  <div id="typhoon-marker">
    <img src="./images/typhoon-marker.png" alt="" />
  </div>
</template>

<script>
import Overlay from "ol/Overlay";
import { Feature } from "ol";
import * as Source from "ol/source";
import * as Layer from "ol/layer";
import { Stroke, Fill, Text, Style, Icon } from "ol/style";
import { Circle, Polygon } from "ol/geom";
export default {
  props: {
    selectedFeaData: null,
  },
  data() {
    return {
      map: this.$parent.map,
      popup: null,
    };
  },
  methods: {
    computeRadiusPoints(centerCoor,radiusData, color,interpolationAngle=1) {
      //1°=111319.49079327358m=111.31945km
      let coorArr = [];
      let angle = 0; 
      for (let j = 1; j <= 4; j++) {
        let r = radiusData[j - 1] / 111.31945; //半径 转成°为单位
        for (let i = 1; i <= 90 / interpolationAngle; i++) {
          angle -= interpolationAngle;
          let x = centerCoor[0] + Math.sin((angle * Math.PI) / 180) * r;
          let y = centerCoor[1] + Math.cos((angle * Math.PI) / 180) * r;
          coorArr.push([x, y]);
        }
      }
      var feature = new Feature({
        geometry: new Polygon([coorArr]),
      });
      var style = new Style({
        fill: new Fill({
          color: color,
        }),
      });
      debugger
      feature.setStyle(style);
      return feature;
    },
    drawTyphoonRadius(value) {
      let feaArr = [];
      if (value.radius7 != 0) {
        let centerCoor = [value.longitude, value.latitude];
        let radiusData = [
          value.radius7_quad.nw,
          value.radius7_quad.sw,
          value.radius7_quad.se,
          value.radius7_quad.ne,

          
        ];
        feaArr.push(this.computeRadiusPoints(centerCoor,radiusData, `rgba(244, 208, 0,0.4)`));
        if (value.radius10 != 0) {
          radiusData = [
            value.radius10_quad.nw,
            value.radius10_quad.sw,
            value.radius10_quad.se,
            value.radius10_quad.ne,
          ];
          feaArr.push(this.computeRadiusPoints(centerCoor,radiusData,`rgba(244, 208, 0,0.6)`));
        }
        if (value.radius12 != 0) {
          radiusData = [
            value.radius12_quad.nw,
            value.radius12_quad.sw,
            value.radius12_quad.se,
            value.radius12_quad.ne,
          ];
          feaArr.push(this.computeRadiusPoints(centerCoor,radiusData, `rgba(244, 208, 0,0.8)`));
        }
        let vectorSource = new Source.Vector({
          features: feaArr,
        });
        var vectorLayer = new Layer.Vector({
          source: vectorSource,
        });
        this.map.addLayer(vectorLayer);
      }
    },
  },
  mounted() {
    const element = document.getElementById("typhoon-marker");
    this.popup = new Overlay({
      element: element,
      positioning: "center-center",
      offset: [-20, -20],
      stopEvent: false,
    });
    this.map.addOverlay(this.popup);
  },
  watch: {
    selectedFeaData: {
      handler(value) {
        this.$nextTick(() => {
          this.popup.setPosition([value.longitude, value.latitude]);
          this.drawTyphoonRadius(value);
        });
      },
      immediate: true,
      depth: true,
    },
  },
};
</script>

<style lang="scss">
@keyframes change {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
#typhoon-marker {
  position: absolute;
  img {
    height: 40px;
    width: 40px;
    animation: change 4s linear infinite;
  }
}
</style>