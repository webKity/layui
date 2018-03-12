<template>
  <div :class="className" @click="click(menu.href)">
    <i :class="menu.icon"></i>
    <span>{{menu.name}}</span>
  </div>
</template>

<script>
import emitter from '../mixins/emitter'

export default {
  name: 'layuiMenuItem',
  mixins: [emitter],
  props: {
    menu: {
      type: Object,
      default: {
        icon: '',
        name: '',
        href: ''
      }
    }
  },
  data () {
    return {
      namespace: 'layui-menu',
      active: false
    }
  },
  computed: {
    className () {
      return [
        `${this.namespace}-item`,
        {
          [`${this.namespace}-active`]: this.active
        }
      ]
    }
  },
  methods: {
    click (href) {
      let parent = this.$parent
      let name = parent.$options.name
      while (parent && (!name || name !== 'layuiMenu')) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
      }

      if (parent) {
        this.dispatch('layuiSubmenu', 'onselect', true)
      } else {
        this.dispatch('layuiMenu', 'onselect', this.menu.name)
      }
      this.jump(href)
    },
    jump (href) {
      if (this.$router) {
        this.$router.push(href)
      } else {
        window.location.href = href
      }
    }
  },
  mounted () {
    this.$on('onupdateActive', (active) => {
      if (this.menu.name === active) {
        this.active = true
      } else {
        this.active = false
      }
    })
  }
}
</script>

<style lang="scss">
@import "./../style/color.scss";
@import "./../style/fontSize.scss";
@import "./../style/mixin.scss";

.layui-menu{
  &-item{
    height: 49px;
    line-height: 49px;
    background-color: transparent;
    border-bottom: 1px solid $menu-border-color;
    @include textSize;
    border-bottom: $menu-border-color;
    padding-left: 30px;
    cursor: pointer;
    &:hover{
      background-color: $darkPrimaryColor;
      color: $whiteColor;
    }
  }
  &-active{
    background-color: $primaryColor;
    color: $whiteColor;
    &:hover{
      background-color: $primaryColor;
      color: $whiteColor;
    }
  }
}
</style>
