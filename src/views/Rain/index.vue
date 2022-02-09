<template>
  <div class="rain-panel">
    <div class="rain-panel-list">
      <div class="rain-panel-title">
        <span>降雨预测</span>
      </div>
      <div class="rain-panel-list-item">
        <el-table
          ref="table"
          v-loading="isLoading"
          :data="rainList"
          :style="{ height: '100%' }"
          :header-cell-style="{ padding: '2px 0', color: '#4d94f8' }"
          :cell-style="{ padding: '2px 0' }"
          @select="handleSelect"
        >
          <el-table-column type="selection" width="30" />
          <el-table-column prop="date" label="日期" width="270" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { Feature } from "ol";
import { Stroke, Fill, Text, Style } from "ol/style";
import * as Source from "ol/source";
import * as Layer from "ol/layer";
import Select from "ol/interaction/Select";
import { Polygon } from "ol/geom";
import { pointerMove } from "ol/events/condition";
export default {
  name: "rain",
  data() {
    return {
      map: this.$parent.$parent.map,
      isShowOlPopPanel: false,
      rainLayers: new Map(),
      rainList: [],
      isLoading:false
    };
  },
  mounted() {
    /**初始化时获取降雨列表 */
    let _this = this;
    this.isLoading=true;
    fetch(`/DataDir/Rain/index.json`)
      .then((res) => res.json())
      .then((data) => {
        data.map((v) => {
          _this.rainList.push({
            date: v,
          });
        });
        this.isLoading=false;
      });
  },
  methods: {
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
        debugger;
        let selectedFea = e.selected[0].values_;
        _this.isShowOlPopPanel = true;
      });
      return selectType;
    },

    handleSelect(selection, row) {
      let isCheck = selection.includes(row);
      if (this.rainLayers.size == 1) {
        //如果多选了，则将旧的移除，达到单选效果
        this.$refs.table.toggleRowSelection(selection[0], false);
        this.deSelectRain(selection[0].date);
      }
      if (isCheck) {
        this.isLoading=true;
        this.selectRain(row.date);
        
      } else {
        this.deSelectRain(row.date);
      }
    },

    async selectRain(id) {
      let data = await fetch(`/DataDir/Rain/${id}.json`).then((res) =>
        res.json()
      );
      let layer = this.addPolygon(data);
      this.rainLayers.set(id, layer);
      this.isLoading=false;
      // this.addMoveInteraction(layer);
    },

    deSelectRain(id) {
      this.map.removeLayer(this.rainLayers.get(id));
      this.rainLayers.delete(id);
    },

    addPolygon(rainData) {
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
        feature.setProperties({
          level: "rain",
          date:rainData.date
        });
        result.push(feature);
      });

      this.vectorSource = new Source.Vector({
        features: result,
      });
      var vectorLayer = new Layer.Vector({
        source: this.vectorSource,
      });
      this.map.addLayer(vectorLayer);
      return vectorLayer;
    },
  },
  computed: {},
  beforeUnmount(){
    //组件销毁时清除降雨
    this.rainLayers.forEach(layer=>{
      this.map.removeLayer(layer);
    })
  }
};
</script>

<style lang="scss">
.rain-panel {
  width: 300px;
  height: 100%;
  min-height: 640px;
  position: absolute;
  top: 0;
  left: 70px;
  background-color: white;
  border: 1px solid black;
  .rain-panel-title {
    color: #166abe;
    background-color: #f3f4f7;
    border: 1px solid #adadad;
  }
}
</style>