<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // console.log(this.$refs.wrapper)
    const wrapper = this.$refs.wrapper
    this.scroll = new BScroll(wrapper, {
      probeType: this.probeType,
      click: true,
      // 图片不能滚动，见文档中的常见问题
      observeDOM: true,
      pullUpLoad: this.pullUpLoad
    })

    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })

    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  },
};
</script>
<style scoped>
</style>