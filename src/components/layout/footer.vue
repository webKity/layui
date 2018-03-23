<template>
  <div class="layui-footer" ref="footer">
    <slot></slot>
  </div>
</template>

<script>
export default{
  mounted () {
    this.$nextTick(() => {
      this.$emit('init', this.$refs.footer.offsetHeight)
    })
  }
}
</script>

<style lang="scss">
.layui-footer{
  width: 100%;
  height: 40px;
}
</style>
