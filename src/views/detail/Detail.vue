<template>
  <div class="detail">
    <detail-nav-bar
      class="detail-bar"
      @detailTitleClick="detailTitleClick"
      ref="detailBar"
    />
    <scroll
      class="detail-content"
      ref="scroll"
      @scroll="detailScroll"
      :probe-type="3"
      :pull-up-load="true"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comments" :comment-info="commentInfo" />
      <goods-list ref="recommends" :goods="recommendInfo" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="scrollTo" v-show="isShow"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComponent/DetailNavBar";
import DetailSwiper from "./childComponent/DetailSwiper";
import DetailShopInfo from "./childComponent/DetailShopInfo";
import DetailBaseInfo from "./childComponent/DetailBaseInfo";
import DetailGoodsInfo from "./childComponent/DetailGoodsInfo";
import DetailParamInfo from "./childComponent/DetailParamInfo";
import DetailCommentInfo from "./childComponent/DetailCommentInfo";
import DetailBottomBar from "./childComponent/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { mapActions } from "vuex";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { itemListenerMIxin, topBackMixin } from "common/mixin";
export default {
  name: "Detail",
  mixins: [itemListenerMIxin, topBackMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      id: null,
      // 用户存储detail轮播图数据
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      themeTopYs: [],
      currentIndex: 0,
    };
  },
  created() {
    // 保存当前上商品的id
    this.id = this.$route.query.id;

    // 获取当前商品的信息
    getDetail(this.id).then((res) => {
      // console.log(res);
      const data = res.result;
      // 获取商品轮播图
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取商家信息
      this.shop = new Shop(data.shopInfo);
      // 获取商品详细信息
      this.detailInfo = data.detailInfo;
      // 获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 获取商品评论数据
      if (data.rate.cRate > 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 这里获取值有问题，图片加载完成后，获取的高度才是正确的
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);

      //   console.log(this.themeTopYs);
      // });
    });

    // 获取推荐数据
    getRecommend().then((res) => {
      this.recommendInfo = res.data.list;
    });
  },
  mounted() {
    // console.log("detail");
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
      // console.log(this.themeTopYs);
    },
    detailTitleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    detailScroll(position) {
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.detailBar.currentIndex = this.currentIndex;
        }
      }

      // 判断回到顶部图标是否显示
      this.isShow = -position.y > 1000;
    },
    addToCart() {
      const product = {};
      product.id = this.id;
      product.imgURL = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;

      // this.$store.commit('addCart', product)

      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });

      this.addCart(product).then((res) => {
        this.$toast.show(res, 2000)
      });
    },
  },
  destroyed() {
    this.$bus.$on("imgLoad", this.itemImgLisener);
  },
};
</script>
<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-content {
  height: calc(100% - 102px);
  overflow: hidden;
}
</style>
