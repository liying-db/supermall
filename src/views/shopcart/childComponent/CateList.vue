<template>
  <div class="cate-list">
    <scroll class="content" ref="scroll">
      <cate-list-item
        v-for="(item, index) in cateList"
        :key="index"
        :item-info="item"
      />
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CateListItem from "./CateListItem";
import Scroll from "components/common/scroll/Scroll";

export default {
  components: { CateListItem, Scroll },
  name: "CateList",
  computed: {
    ...mapGetters(["cateList"]),
  },
  data() {
    return {};
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cate-list {
  height: calc(100vh - 137px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>