<template>
  <div v-show="isShow" class="toast">{{ message }}</div>
</template>
<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, duration = 1500) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false
      }, duration)
    },
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  transform: translate(-50%, -50%);
  z-index: 999;
}
</style>