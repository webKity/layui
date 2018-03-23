<template>
  <div class="layui-header" ref="header">
    <slot></slot>
  </div>
</template>

<script>
export default{
  mounted () {
    this.$nextTick(() => {
      this.$emit('init', this.$refs.header.offsetHeight)
    })
  }
}
</script>

<style lang="scss">
.layui-header{
  width: 100%;
  height: 60px;
}
</style>
