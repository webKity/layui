<template>
  <div class="base-layout">
    <layui-slider class="base-layout-slider">
      <div class="base-layout-control"></div>
      <layui-menu :menus="menuData"></layui-menu>
    </layui-slider>
    <div class="base-layout-main">
      <layui-header>
        <slot name="header"></slot>
      </layui-header>
      <layui-content class="base-layout-content">
        <slot></slot>
      </layui-content>
      <layui-footer>
        <slot name="footer"></slot>
      </layui-footer>
    </div>
  </div>
</template>

<script>
import layuiSlider from './slider'
import layuiMenu from '../menu/menu.vue'
import layuiHeader from './header'
import layuiContent from './content'
import layuiFooter from './footer'

export default {
  components: {
    layuiSlider,
    layuiMenu,
    layuiHeader,
    layuiContent,
    layuiFooter
  },
  props: {
    menuData: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
@import '../style/color.scss';
@import '../style/mixin.scss';

.base-layout{
  @include one-screen;
  display: flex;
  height: 100%;
  &-slider{
    background-color: $menu-bg-color;
  }
  &-control{
    height: 60px;
    border-bottom: 1px solid $menu-border-color;
  }
  &-main{
    width: 100%;
  }
  &-content{
    height: calc(100% - 120px);
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 15px;
    background-color: $lightGrayColor;
  }
}
</style>
