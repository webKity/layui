<template>
  <div class="layui-error layui-fluid">
    <div class="layui-row">
      <div class="layui-col-xs6">
        <div class="layui-error-img" :style="{backgroundImage: 'url(' + errorImg + ')'}"></div>
      </div>
      <div class="layui-error-word layui-col-xs6">
        <div class="layui-error-code">{{code}}</div>
        <div class="layui-error-msg">{{msg}}</div>
        <layui-button type="primary" @click="btn.action">{{btn.word}}</layui-button>
      </div>
    </div>
  </div>
</template>

<script>
import layuiButton from './../button'
import svg403 from './403.svg'
import svg404 from './404.svg'
import svg500 from './500.svg'

export default {
  props: {
    code: {
      type: String,
      default: '404'
    },
    msg: {
      type: String,
      default: '抱歉，你访问的页面不存在'
    },
    btn: {
      type: Object,
      default () {
        return {
          word: '返回首页',
          action () {}
        }
      }
    }
  },
  data () {
    return {
      imgs: {
        svg403: svg403,
        svg404: svg404,
        svg500: svg500
      }
    }
  },
  computed: {
    errorImg () {
      let img = this.imgs[`svg${this.code}`]
      return img
    }
  },
  components: {
    layuiButton
  }
}
</script>

<style lang="scss">
@import "./../style/color.scss";
@import "./../style/fontSize.scss";
@import "./../style/mixin.scss";
@import "./../style/guide";

$namespace:       layui-error;
.#{$namespace}{
  padding-top: 10%;
  .#{$namespace}-img{
    width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
    float: right;
  }
  .#{$namespace}-word{
    float: left;
    .#{$namespace}-code{
      color: $lightBlackColor;
      font-size: $bigSize;
      margin-top: 100px;
    }
    .#{$namespace}-msg{
      color: $darkGrayColor;
      font-size: $h6Size;
      margin-bottom: 10px;
    }
  }
}
</style>
