<template>
  <div class="layui-content" ref="content">
    <slot></slot>
  </div>
</template>

<script>
export default{
  mounted () {
    this.$nextTick(() => {
      this.$emit('init', this.$refs.content.offsetHeight)
    })
  }
}
</script>
