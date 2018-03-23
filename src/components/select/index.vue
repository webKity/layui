<template>
  <div class="layui-select" v-outclick="close">
    <div class="layui-select-title" @click="toggle">
      <span>{{selection.label}}</span>
      <i class="layui-select-edge" :class="{'rotate': visiable}"></i>
    </div>
    <drop-transition>
      <dl v-show="visiable" class="layui-select-options">
        <dd class="layui-select-option"
        :class="{'active': selection.value === item.value}"
        v-for="(item, index) in options" :key="index"
        @click="select(item)">{{item.label}}</dd>
      </dl>
    </drop-transition>
  </div>
</template>

<script>
import {isObject, each} from '../utils'
import dropTransition from './../animation/dropTransition'
import outclick from './../directive/outclick'

export default{
  directives: outclick,
  components: {
    dropTransition
  },
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: [String, Number, Object],
      default: ''
    }
  },
  data () {
    return {
      selection: {value: '', label: '请选择'},
      visiable: false
    }
  },
  methods: {
    init () {
      if (this.options.length > 100) {
        console.error('options长度不能超过100！')
        return
      }
      if (isObject(this.value)) {
        this.selection = this.value
      } else {
        each(this.options, (item) => {
          if (item.value === this.value) {
            this.selection = item
            return false
          }
        })
      }
    },
    select (item) {
      this.selection = item
      this.visiable = false
      this.$emit('onselect', item)
      this.$emit('input', isObject(this.value) ? item : item.value)
    },
    toggle () {
      this.visiable = !this.visiable
    },
    close () {
      this.visiable = false
    }
  },
  mounted () {
    this.$nextTick(this.init)
  }
}
</script>

<style lang="scss">
@import "./../style/color.scss";
@import "./../style/fontSize.scss";
@import "./../style/mixin.scss";
@import "./../style/common.scss";

$namespace: layui-select;

.#{$namespace}{
  position: relative;
  width: 100%;
  cursor: pointer;
  &-title{
    @include input-style;
    .#{$namespace}-edge{
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -3px;
      @include edge;
      transition: all .3s;
      &.rotate{
        transform: rotate(180deg);
        margin-top: -9px;
      }
    }
  }
  &-options{
    position: absolute;
    left: 0;
    top: 42px;
    padding: 5px 0;
    z-index: 999;
    min-width: 100%;
    border: 1px solid $borderColor;
    max-height: 300px;
    overflow-y: auto;
    background-color: $whiteColor;
    border-radius: 2px;
    box-sizing: border-box;
    @include shadow;
    dd{
      padding: 0 10px;
      line-height: 36px;
      @include ellipsis;
      &:hover{
        background-color: $lightGrayColor;
      }
      &.active{
        background-color: $primaryColor;
        color: $whiteColor;
      }
    }
  }
}
</style>
