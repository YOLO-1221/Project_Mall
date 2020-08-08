<template>
  <div class="tab-bar-item" @click="itemClick">
<!--    插槽的属性容易被替换掉，因此要多封装一层-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
<!--    <div :class="{active: isActive}"><slot name="item-text"></slot></div>-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>

<!--    <img src="../../assets/img/tabbar/home.svg" alt="">-->
<!--    <div>首页</div>-->
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: "red"
      }
    },
    data() {
      return {
        // isActive: false
      }
    },
    computed: {
      isActive() {
        // this.$route.path 当前活跃的path和点击的path比较
        return this.$route.path.indexOf(this.path) !== -1   // 表示找到了
      },
      activeStyle() {
        // 判断是否处于活跃状态，处于活跃状态，改变颜色，不处于，不变
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    /*一般的tab-bar的高度*/
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /*用于去掉img标签下边的三个像素*/
    vertical-align: middle;
  }

  /*.active {*/
  /*  color: red;*/
  /*}*/
</style>
