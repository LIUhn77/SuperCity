<template>
  <div id="olContainer">
    <PointerMove :map="map" />
  </div>
  <Menu current="ol" />
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import * as Source from "ol/source";

import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import { Fill, Stroke, Style } from "ol/style";
import { Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Menu from "../Menu/index.vue";
import GDGeoJson from "@/data/gdVector.json";
import PointerMove from "@/components/MapInteraction/pointerMove.vue";
import { mapSelect } from "@/components/PubilcFunction/olFunction.js";

export default {
  name: "OpenLayers",
  components: { PointerMove, Menu },
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.initMap();
    this.initGDGeoJson();
    // this.addPointerMoveEvent();
  },
  methods: {
    initMap() {
      // 天地图电子底图
      var tdtMapVecLayer = new TileLayer({
        source: new Source.XYZ({
          url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=c6e2c82dc75924932f647dc4f18da4a6",
          wrapX: false,
        }),
      });

      // 天地图注记
      var tdtMapLabelLayer = new TileLayer({
        source: new Source.XYZ({
          url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=c6e2c82dc75924932f647dc4f18da4a6",
        }),
      });

      // 天地图影像底图
      var tdtMapImgLayer = new TileLayer({
        source: new Source.XYZ({
          url: "https://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=c6e2c82dc75924932f647dc4f18da4a6",
        }),
      });

      var arcgisMapLayer = new TileLayer({
        source: new Source.TileArcGISRest({
          url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer",
        }),
      });

      this.map = new Map({
        target: "olContainer",
        layers: [tdtMapImgLayer, tdtMapLabelLayer],
        view: new View({
          projection: "EPSG:4326",
          center: [113.564839, 22.948857],
          zoom: 9,
        }),
      });
      // mapSelect(this.map, 1);
    },

    initGDGeoJson() {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(GDGeoJson),
      });
      const vectorLayer = new VectorLayer({
        // projection: "EPSG:4326",
        className: "GD_Vector",
        source: vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: "blue",
            width: 1,
          }),
          fill: new Fill({
            color: "rgba(220, 220, 220, 0.4)",
          }),
        }),
      });
      this.map.addLayer(vectorLayer);
    },
  },

  watch: {
    map: function () {},
  },
};
</script>

<style lang="scss">
#olContainer {
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>
