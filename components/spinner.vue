<template>
  <transition name="fade-progress-bar">
    <div v-if="!disabled" class="spinner d-flex justify-center align-center">
      <v-progress-circular
        indeterminate
        color="bluetext"
      ></v-progress-circular>
    </div>
    <div v-else key="disabled"></div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      disabled: false
    }
  },
  mounted() {
    this.setShow();
  },
  methods: {
    setShow() {
      setTimeout(() => {
        this.disabled = true;
      }, 800);
    },
  },
}
</script>

<style lang="scss">
.spinner {
  z-index: 9999;
  position: absolute;
  background: transparent;
  backdrop-filter: blur(12px);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
