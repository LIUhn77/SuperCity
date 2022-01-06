<template>
  <div class="menu-item">
    <el-image class="menu-item-image" :src="image" fit="contain"></el-image>
    <span>{{ itemName }}</span>
  </div>
</template>

<script>
/**
 * 菜单项组件
 * @param {*string} itemName-名称
 * @param {*string} image-图片地址
 */
export default {
  name: "MenuItem",
  props: {
    itemName: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
    };
  },
  methods: {
  },
  watch: {},
};
</script>

<style lang="scss">
.menu-item {
  margin-bottom: 10px;
  margin-top: 10px;
  transition: 0.5s;
  height: 80px;
  .menu-item-image {
    width: 100%;
    margin-top: 5px;
    height: 50px;
  }
  span {
    color: white;
    font-size: small;
  }
}
.menu-item:hover {
  background-color: rgba(166, 212, 255, 0.6);
  cursor: pointer;
  .menu-item-image {
    transform: scale(1.2);
  }
}
</style>