<template>
<!--  ref 一般绑定到子组件上 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  // import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1、创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true
      })

      // 2、监听滚动的位置
      this.scroll.on('scroll', position => {
        // console.log(position);
        this.$emit('scroll', position)
      })

      // 3、监听上拉事件
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多');
        this.$emit('pullingUp')
      })

      this.scroll.refresh()
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        console.log('---');
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
