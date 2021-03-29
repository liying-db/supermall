<template>
  <div class="detail">
    <detail-nav-bar class="detail-bar"/>
    <scroll class="detail-content" ref="scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommendInfo" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComponent/DetailNavBar";
import DetailSwiper from "./childComponent/DetailSwiper";
import DetailShopInfo from "./childComponent/DetailShopInfo";
import DetailBaseInfo from "./childComponent/DetailBaseInfo";
import DetailGoodsInfo from "./childComponent/DetailGoodsInfo";
import DetailParamInfo from "./childComponent/DetailParamInfo";
import DetailCommentInfo from "./childComponent/DetailCommentInfo"
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from "components/content/goods/GoodsList"
import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll
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
      recommendInfo: []
    };
  },
  created() {
    // 保存当前上商品的id
    this.id = this.$route.query.id;

    // 获取当前商品的信息
    getDetail(this.id).then((res) => {
      console.log(res);
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
      this.detailInfo = data.detailInfo
      // 获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 获取商品评论数据
      if(data.rate.cRate > 0) {
        this.commentInfo = data.rate.list[0]
      }
      
    });

    // 获取推荐数据
    getRecommend().then(res => {
      this.recommendInfo = res.data.list
    })
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
    }
  }
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
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>