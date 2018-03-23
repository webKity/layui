<template>
  <div class="layui-layout">
    <layui-header ref="header" @init="initHeader">
      <slot name="header"></slot>
    </layui-header>
    <layui-content :style="_contentHeight">
      <slot></slot>
    </layui-content>
    <layui-footer ref="footer" @init="initFooter">
      <slot name="footer"></slot>
    </layui-footer>
  </div>
</template>

<script>
import layuiHeader from './header'
import layuiContent from './content'
import layuiFooter from './footer'

export default {
  components: {
    layuiHeader,
    layuiContent,
    layuiFooter
  },
  data () {
    return {
      _headerHeight: 0,
      _footerHeight: 0
    }
  },
  computed: {
    _contentHeight () {
      let winH = window.screen.availHeight || document.documentElement.offsetWidth
      let headerHeight = this._headerHeight ? this._headerHeight : 0
      let footerHeight = this._footerHeight ? this._footerHeight : 0
      let contentHeight = (winH - headerHeight - footerHeight) + 'px'
      let style = {minHeight: contentHeight}
      return style
    }
  },
  methods: {
    initHeader (h) {
      this._headerHeight = h
    },
    initFooter (h) {
      this._footerHeight = h
    }
  }
}
</script>
