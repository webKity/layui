<template>
  <div class="layui-swiper-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$nextTick(() => {
      this.$parent.init()
    })
  },
  beforeDestroy () {
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.destroy()
    })
  }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';

.layui-swiper-item{
  @include one-screen;
  @include back-size;
  left:0;
  top:0;
}
</style>
