<template>
  <div class="layui-menu">
    <template v-for="menu in menus">
      <layui-submenu v-if="menu.children && menu.children.length > 0" :submenu="menu"></layui-submenu>
      <layui-menu-item v-else :menu="menu"></layui-menu-item>
    </template>
  </div>
</template>

<script>
import layuiSubmenu from './submenu'
import layuiMenuItem from './menuItem'
import emitter from '../mixins/emitter'

export default{
  name: 'layuiMenu',
  mixins: [emitter],
  components: {
    layuiSubmenu,
    layuiMenuItem
  },
  props: {
    menus: {
      type: Array,
      default: []
    },
    active: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      currentActive: this.active
    }
  },
  watch: {
    currentActive () {
      this.updateActive()
    }
  },
  methods: {
    updateActive () {
      if (this.currentActive === undefined) {
        this.currentActive = -1
      }
      this.broadcast('layuiSubmenu', 'onupdateActive', false)
      this.broadcast('layuiMenuItem', 'onupdateActive', this.currentActive)
    }
  },
  mounted () {
    this.$on('onselect', (active) => {
      this.currentActive = active
      this.$emit('onselect', active)
    })
  }
}
</script>

<style lang="scss">
@import "./../style/color.scss";
@import "./../style/fontSize.scss";

.layui-menu{
  width: 100%;
  background-color: $menu-bg-color;
  color: $menu-text-color;
  @include textSize;
}
</style>
