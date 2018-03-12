<template>
  <div v-show="isActive" class="layui-tab-item">
    <slot></slot>
  </div>
</template>

<script>
export default{
  props: {
    label: {
      type: [String, Number],
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    isActive () {
      return this.name === this.$parent.active
    }
  },
  created () {
    let obj = {}
    obj.label = this.label
    obj.name = this.name
    this.$parent.addTitles(obj)
  }
}
</script>
