<template>
  <div>
    <div class="layui-submenu" v-if="isSubmenu">
      <div class="layui-submenu-title" @click="click">
        <i v-if="submenu.icon && submenu.icon !== ''" :class="submenu.icon"></i>
        <span>{{submenu.name}}</span>
      </div>
      <collapse-transition>
        <div class="layui-submenu-content" v-show="visiable">
          <template v-for="menus in submenu.children">
            <layui-submenu :submenu="menus"></layui-submenu>
          </template>
        </div>
      </collapse-transition>
    </div>
    <layui-menu-item v-else :menu="submenu"></layui-menu-item>
  </div>
</template>

<script>
import layuiMenuItem from './menuItem'
import collapseTransition from './../animation/collapseTransition'
import emitter from '../mixins/emitter'

export default {
  name: 'layuiSubmenu',
  mixins: [emitter],
  components: {
    layuiMenuItem,
    collapseTransition
  },
  props: {
    submenu: {
      type: Object,
      default: {
        icon: '',
        name: '',
        children: []
      }
    }
  },
  data () {
    return {
      active: false,
      visiable: false
    }
  },
  computed: {
    isSubmenu () {
      return this.submenu.children && this.submenu.children.length > 0
    }
  },
  methods: {
    click () {
      this.$parent.$children.forEach((item) => {
        if (item.$options.name === 'layuiSubmenu' && item !== this) item.visiable = false
      })
      this.visiable = !this.visiable
    }
  },
  mounted () {
    this.$on('onselect', (active) => {
      this.active = active
      this.visiable = active
    })
    this.$on('onupdateActive', (active) => {
      this.active = active
      this.visiable = active
    })
  }
}
</script>

<style lang="scss">
@import "./../style/color.scss";
@import "./../style/fontSize.scss";
@import "./../style/mixin.scss";

.layui-submenu{
  background-color: $menu-bg-color;
  &-title{
    height: 49px;
    line-height: 49px;
    background-color: $menu-bg-color;
    border-bottom: 1px solid $menu-border-color;
    overflow: hidden;
    padding: 0 20px;
    cursor: pointer;
    i{
      padding-right: 5px;
    }
  }
  &-content{
    background-color: $menu-opend-bg-color;
    border-bottom: 1px solid $menu-border-color;
    overflow: hidden;
  }
}
</style>
