<!--
  @台风路径信息组件
  @selectTyphoonData  需要显示的台风数据，为最新勾选的台风
 -->

<template>
  <div class="typhoon-panel-data">
    <div class="typhoon-panel-title">
      <span>台风路径信息</span>
    </div>
    <el-table
      :data="tableData"
      size="small"
      style="width: 100%"
      max-height="140"
      :header-cell-style="{ padding: '2px 0', color: '#4d94f8' ,textAlign:'center'}"
      :cell-style="{ padding: '2px 0',textAlign:'center' }"
    >
      <el-table-column prop="time" label="时间" width="85" />
      <el-table-column prop="speed" label="风速" width="55" />
      <el-table-column prop="move_dir" label="移向" width="60" />
      <el-table-column
        prop="strong"
        label="强度"
        show-overflow-tooltip
        width="100"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    selectTyphoonData: Object,
  },
  data() {
    return {
      tableData: [],
    };
  },
  watch: {
    selectTyphoonData: {
      handler(value) {
        let dataArr = [];
        value.points.map((v) => {
          const dateTime=new Date(v.time).format('m-d H:i')
          let data = {
            time: dateTime,
            speed: v.speed+'m/s',
            move_dir: v.move_dir||'-',
            strong: v.strong.substr(0,v.strong.indexOf('(')),
          };
          dataArr.push(data);
        });
        this.tableData = dataArr;
      },
      immediate: true,
      depth: true,
    },
  },
};
</script>

<style>
</style>