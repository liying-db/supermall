<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>
<script>
export default {
  name: 'BackTop',
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.backtop {
  position: absolute;
  bottom: 55px;
  right: 8px;
}
.backtop img {
  width: 43px;
  height: 43px;
}
</style>