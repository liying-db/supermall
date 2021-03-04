<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index">
      <a :href="item.link" class="recommend-item">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "RcommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.recommend {
  display: flex;
  justify-content: space-around;
  padding: 25px 0 15px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  display: block;
  font-size: 14px;
  text-align: center;
}
.recommend-item img {
  width: 80px;
  height: 80px;
}
</style>