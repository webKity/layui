<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
export default{
  data () {
    return {
      namespace: 'layui-slide',
      collapse: false
    }
  },
  computed: {
    className () {
      return [
        `${this.namespace}`,
        {
          [`${this.namespace}-collapse`]: this.collapse
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.layui-slide{
  overflow: hidden;
  transition: width .6s;
  width: 200px;
  height: 100%;
  &-collapse{
    width: 60px;
  }
}
</style>
