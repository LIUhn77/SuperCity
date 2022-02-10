<template>
  <div class="toolbar">
    <el-dropdown @command="handleCommand">
      <el-button type="primary">
        工具<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">绘制面</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
          <el-dropdown-item>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
    methods:{
        handleCommand(val){
            switch(val){
                case "a":
                    break;
            }
        }
    }
};
</script>

<style>
.toolbar{
    right: 50px;
    top: 10px;
    background: #323232;
    position: absolute;
}
</style>