<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="titleItem"
          :class="{ active: index === currentIndex }"
          @click="titleCLick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleCLick(index) {
      this.currentIndex = index
      this.$emit('detailTitleClick', index)
    },
    back() {
      this.$router.back()
    }
  }
};
</script>

<style scoped>
.back {
  margin-top: 8px;
}
.title {
  display: flex;
  font-size: 14px;
}
.titleItem {
  flex: 1;
}
.active {
  color: var(--color-hight-text);
}
</style>