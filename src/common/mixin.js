import BackTop from "components/content/backtop/BackTop";
import { debounce } from './debounce'

export const itemListenerMIxin = {
  data() {
    return {
      itemImgLisener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 20);
    this.itemImgLisener = () => {
      refresh();
    };
    // 兄弟组件之间相互通信
    this.$bus.$on("imgLoad", this.itemImgLisener);
    // console.log('mixin')
  },
}

export const topBackMixin = {
  data() {
    return {
      isShow: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    scrollTo() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  },
}