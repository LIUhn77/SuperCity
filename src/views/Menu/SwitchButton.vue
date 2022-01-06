<template>
  <router-link :to="to">
    <el-tooltip :content="content" placement="right" effect="light">
      <el-button class="el-button-switch" circle>
        <el-icon size="10" color="red"><apple /></el-icon>
      </el-button>
    </el-tooltip>
  </router-link>
</template>

<script>
/**
 * 二三维切换按钮
 * @param {*string} to-路由跳转link
 * @param {*string} content-提示窗口内容
 */
export default {
  name: "SwitchButton",
  props: {
    to: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.el-button-switch {
  bottom: 15px;
  left: 13px;
  position: absolute;
  background-color: floralwhite;
}
.el-button-switch:hover {
  background-color: rgba(166, 212, 255, 0.6);
  font-size: 18px;
  left: 11px;
}
</style>