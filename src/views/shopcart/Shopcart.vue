<template>
  <div class="shop-cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 列表 -->
    <cate-list />
    <!-- 底部操作部分 -->
    <cate-bottom-bar />
  </div>
</template>
<script>
import CateList from "./childComponent/CateList";
import CateBottomBar from "./childComponent/CateBottomBar";
import NavBar from "components/common/navbar/NavBar";

import { mapGetters } from "vuex";
export default {
  name: "Shopcart",
  components: {
    CateList,
    CateBottomBar,
    NavBar,
  },
  computed: {
    ...mapGetters({
      length: "cartLength",
    }),
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
}
</style>