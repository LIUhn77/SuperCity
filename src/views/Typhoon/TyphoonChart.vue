<!--
  @勾选台风数据图表显示
  @chartsData 显示的台风数据
 -->

<template>
  <div class="typhoon-panel-chart">
    <div class="typhoon-panel-title">
      <span>图表展示</span>
    </div>
    <div id="typhoon-chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    chartsData: Object,
  },
  data() {
    return {
      myChart: null,
    };
  },
  beforeUnmount() {
    this.myChart.clear();
  },
  mounted() {
    var chartDom = document.getElementById("typhoon-chart");
    this.myChart = echarts.init(chartDom);
    // this.renderChart(this.chartsData);
  },
  methods: {
    processData(data) {
      let value = {
        timeArr: [],
        speedArr: [],
      };
      data.points.map((v, i) => {
        value.timeArr.push(new Date(v.time).format("m-d H:i"));
        value.speedArr.push(v.speed);
      });
      return value;
    },
    renderChart(data) {
      let value = this.processData(data);
      debugger;
      let option = {
        title: {
          text: this.chartsData.name + "---风速",
        },
        animationDuration: 5000,
        tooltip: {
          order: "valueDesc",
          show: true, 
          trigger: "axis",
          triggerOn: 'mousemove|click',  
          // formatter: function (params) {
          //   return params[0].value;
          // },
          // axisPointer: {
          //   animation: false,
          // },
        },
        xAxis: {
          type: "category",
          splitLine: {
            // show: false,
          },
          data: value.timeArr,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            // show: false,
          },
        },
        series: [
          {
            name: "Fake Data",
            type: "line",
            showSymbol: false,
            data: value.speedArr,
          },
        ],
      };
      this.myChart.setOption(option);
    },
  },
  watch: {
    chartsData: {
      handler(value) {
        this.$nextTick(() => {
          this.renderChart(value);
        });
      },
      immediate: true,
      depth: true,
    },
  },
};
</script>

<style>
.typhoon-panel-chart {
  width: 100%;
  height: 300px;
}
#typhoon-chart {
  width: 100%;
  height: 300px;
}
</style>