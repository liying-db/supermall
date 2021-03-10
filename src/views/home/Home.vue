<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
   <scroll class="content" 
           ref="scroll" 
           :probe-type='3' 
           @scroll="scroll"
           :pull-up-load="true"
           @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control class="tab-control"  :title="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
   </scroll>
   <back-top @click.native="scrollTo" v-show="isShow"></back-top>
  </div>
</template>
<script>
import HomeSwiper from "./childComp/HomeSwiper";
import RecommendView from "./childComp/RecommendView";
import FeatureView from "./childComp/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import { getHomeMultiData, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goodsList: {
        pop: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
      },
      currentType: 'pop',
      isShow: false
    };
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
  computed: {
    showGoods() {
      return this.goodsList[this.currentType].list
    }
  },
  created() {
    this.getHomeMultiData();

    // 获取首页流行数据
    this.getHomeGoods('pop')
    // 获取首页精选数据
    this.getHomeGoods('sell')
    // 获取首页新款数据
    this.getHomeGoods('new')
  },
  methods: {
    /**
     * 事件监听的方法
     */
    tabClick(index) {
      switch(index) {
        case 0: 
          this.currentType = "pop"
          break
        case 1:
          this.currentType = "new"
          break
        case 2: 
          this.currentType = "sell"
          break
      }
    },
    scrollTo() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    scroll(position) {
      this.isShow = -position.y > 1000
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    /**
     * 网络请求的方法
     */
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goodsList[type].page + 1
      getHomeGoods(type, page).then(res => {
        // this.goodsList[type].list = res.data.list
        this.goodsList[type].list.push(...res.data.list)
        this.goodsList[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  },
};
</script>
<style scoped>
.home {
  padding-top: 44px;
  height: 100vh;
  /* position: relative; */
}
.home-nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9;
  background: var(--color-tint);
  color: #fff;
}
.tab-control {
  /* position: sticky;
  top: 44px;
  z-index: 9; */
}
.content {
  height: calc(100% - 93px); 
  overflow: hidden; 
  /* height: 100%; */
  /* position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;*/
}
</style>