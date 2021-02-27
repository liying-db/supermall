<template>
  <div class="tab-bar-item" @click="butClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="textStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props:{
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    textStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    butClick() {
      this.$router.push(this.path)
    }
  },
};
</script>
<style scoped>
.tab-bar-item {
  height: 49px;
  text-align: center;
  flex: 1;
  font-size: 12px;
}
.tab-bar-item img {
  margin-top: 3px;
  margin-bottom: 2px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
</style>