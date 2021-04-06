<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isChecked="isSelectedAll" @click.native="selectAll"/>
      <span>全选</span>
    </div>

    <div class="totalPrice">合计: {{ totalPrice }}</div>
    <div class="calculate" @click="toCalculate">去计算({{selected}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  components: { CheckButton },
  name: "CateBottomBar",
  computed: {
    ...mapGetters(["cateList"]),
    totalPrice() {
      return (
        "￥" +
        this.cateList
          .filter(item => {
            return item.isChecked;
          })
          .reduce((total, item) => {
            return total + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    selected() {
      return this.cateList.filter(item => {
        return item.isChecked; 
      }).length
    },
    isSelectedAll() {
      if(!this.cateList.length) return false
      return !this.cateList.find(item => !item.isChecked)
    }
  },
  methods: {
    selectAll() {
      if(this.isSelectedAll) {
        this.cateList.forEach(item => item.isChecked = false)
      } else {
        this.cateList.forEach(item => item.isChecked = true)
      }
    },
    toCalculate() {
      if(!this.isSelectedAll) {
        this.$toast.show('没有可以计算的商品')
      }
    }
  }
};
</script>
<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}
.check-content {
  display: flex;
  width: 80px;
  align-items: center;
}
.check-button {
  width: 16px;
  height: 16px;
  line-height: 20px;
  margin-right: 5px;
  margin-left: 10px;
}
.totalPrice {
  flex: 1;
}
.calculate {
  width: 90px;
  text-align: center;
  background-color: orange;
}
</style>