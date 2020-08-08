<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

<!--    @click 无法监听组件事件；.native可以监听组件根元素的原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";


  import {getHomeMultidata, getHomeGoods} from "network/home/home";

  export default {
    name: "Home",
    data() {
      return {
        // result: null,
        banners: {},
        recommends: {},
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    // 创建生命周期函数，在创建网页前发送网络请求
    created() {
      // 1、请求多个数据
      this.getHomeMultidata()
      // 在created一般只写主要逻辑，请求数据，具体执行内容放到methods中
      // getHomeMultidata().then(res => {
      //   // console.log(res);
      //   // this.result = res
      //   this.banners = res.data.banner;
      //   console.log(res);
      //   this.recommends = res.data.recommend;
      // })

      // 2、请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      // getHomeGoods('pop', 1).then(res => {
      //   console.log(res);
      // })


    },
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh, 200)

      // 3、监听item中时间加载完成
      this.$bus.$on('itemImageLoad', () => {
        // console.log('------');
        // this.$refs.scroll.refresh()

        refresh()
      })
    },
    methods: {
      /**
       * 事件监听相关方法
       */
      debounce(func, delay) {
        let timer = null

        return function (...args) {
          if (timer) clearTimeout(timer)

          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },



      tabClick(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // console.log(position);
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },


      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          // this.result = res
          this.banners = res.data.banner;
          console.log(res);
          this.recommends = res.data.recommend;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
          // console.log(res);
          // console.log(res.data.list);
        })
      },

    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    /*height: calc(100% - 98px);*/
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
  }

</style>
