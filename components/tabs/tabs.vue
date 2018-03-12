<template>
  <div :class="className">
    <ul class="layui-tab-title">
      <li :class="{'layui-tab-active': active === title.name}" v-for="(title, index) in titles" :key="index" @click="changeActive(index)">{{title.label}}</li>
    </ul>
    <div class="layui-tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      namespace: 'layui-tab',
      active: '',
      titles: []
    }
  },
  computed: {
    className () {
      return [
        `${this.namespace}`,
        {
          [`${this.namespace}-card`]: this.type === 'card'
        }
      ]
    }
  },
  methods: {
    addTitles (label) {
      this.titles.push(label)
    },
    changeActive (index) {
      this.active = this.titles[index].name
      this.$emit('input', this.active)
    }
  },
  created () {
    this.active = this.value
  }
}
</script>

<style lang="scss">
@import "../style/color.scss";
@import "../style/fontSize.scss";
@import "../style/mixin.scss";

$namespace: layui-tab;

.#{$namespace} {
  text-align: left;
  &-title{
    position: relative;
    left: 0;
    white-space: nowrap;
    font-size: 0;
    border-bottom: 1px solid $borderColor;
    transition: all .2s;
    li{
      position: relative;
      height: 40px;
      line-height: 40px;
      min-width: 65px;
      padding: 0 15px;
      text-align: center;
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      @include textSize;
      transition: all .2s;
    }
  }
  &-active{
    position: relative;
    color: $primaryColor;
    &:after {
      position: absolute;
      left: 0;
      top: auto;
      bottom: 0;
      content: " ";
      width: 100%;
      border-bottom: 2px solid $primaryColor;
    }
  }
  &-content{
    padding: 10px;
  }
  // 卡片类型
  &-card{
    .#{$namespace}-title{
      background-color: $lightGrayColor;
      border-bottom: none;
      li{
        margin-right: -1px;
        margin-left: -1px;
      }
    }
    .#{$namespace}-active{
      background-color: $whiteColor;
      &:after {
        border: none;
      }
    }
  }
}
</style>
