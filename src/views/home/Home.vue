<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
      <tab-control
        ref="tab-control2"
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        class="tab-control"
        v-show="isFixed"
      ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="scroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
        ref="tab-control1"
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
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
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

import { getHomeMultiData, getHomeGoods } from "network/home";
import { debounce } from "../../utils/debounce";

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
      currentType: "pop",
      isShow: false,
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0
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
    BackTop,
  },
  computed: {
    showGoods() {
      return this.goodsList[this.currentType].list;
    },
  },
  created() {
    this.getHomeMultiData();

    // 获取首页流行数据
    this.getHomeGoods("pop");
    // 获取首页精选数据
    this.getHomeGoods("sell");
    // 获取首页新款数据
    this.getHomeGoods("new");
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
     this.saveY = this.$refs.scroll.scroll.y
     console.log(this.saveY)
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 20);
    // 兄弟组件之间相互通信
    this.$bus.$on("imgLoad", () => {
      refresh();
    });
  },
  methods: {
    /**
     * 事件监听的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs['tab-control1'].activeIndex = index
      this.$refs['tab-control2'].activeIndex = index
    },
    scrollTo() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    scroll(position) {
      // 判断回到顶部图标是否显示
      this.isShow = -position.y > 1000;
      // 判断tab首页tab是否吸顶
      this.isFixed = -position.y >= this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs['tab-control1'].$el.offsetTop
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
      const page = this.goodsList[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // this.goodsList[type].list = res.data.list
        this.goodsList[type].list.push(...res.data.list);
        this.goodsList[type].page += 1;

        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>
<style scoped>
.home {
  /* padding-top: 44px; */
  height: 100vh;
  /* position: relative; */
}
.home-nav {
  /* position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9; */
  background: var(--color-tint);
  color: #fff;
}
.content {
  /* height: calc(100% - 93px); */
  overflow: hidden;
  height: 100%;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>