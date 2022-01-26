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
import CommonEchart from "@/utils/echart-utils.js";
export default {
  props: {
    chartsData: Object,
  },
  data() {
    return {
      myChart: null,
    };
  },
  beforeUnmount() {},
  mounted() {},
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
      let legend = ["风速"];
      let grid = [{ x: "13%", x2: "5%", y: "10%", y2: "23%" }];
      this.myChart = CommonEchart.getTyphoonSpeedChart(
        "typhoon-chart",
        legend,
        value.timeArr,
        [value.speedArr],
        grid,
        "m/s"
      );
    },
  },
  watch: {
    chartsData: {
      handler(value) {
        this.$nextTick(() => {
          if (this.myChart) this.myChart.clear();
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
  height: 100%;
}
</style>