<template>
  <div class="nav-bar">
<!--    不要对slot进行单独布局，括起来，再布局-->
<!--    具名插槽，设置对应位置-->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    /*height: 44px;*/
    /*line-height 可以将整个div撑起来，并且文字水平居中（有内容的情况下）*/
    line-height: 44px;
    /*文字垂直居中*/
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1) ;
  }

  .left, .right {
    width: 60px;
    /*background-color: red;*/
  }

  .center {
    /*其他的设置了宽度，flex：1 .center就自动填充进去了*/
    flex: 1;
    /*background-color: black;*/
  }
</style>
