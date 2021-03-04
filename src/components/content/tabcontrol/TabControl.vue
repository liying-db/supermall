<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in title"  :key="index" :class="{active: activeIndex === index}" @click="itemClick(index)"> 
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tab-Control',
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      activeIndex: 0
    };
  },
  methods:{
    itemClick(index) {
      this.activeIndex = index;
      this.$emit('tabClick', index)
    }
  }
}
</script>
<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    line-height: 40px;
    height: 40px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-hight-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-tint);
  }
</style>