<template>
  <div id="app">
    <!-- 设置Detail组件不要有缓存，解决每次静茹商品详情页都显示同一个商品的问题 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-bar></main-bar>
  </div>
</template>

<script>
import MainBar from "components/content/MainBar";
export default {
  name: "App",

  components: {
    MainBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
