<template>
  <button type="button" :disabled="disabled" :class="className" @click="clickHandler">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: ''
    },
    fluid: {
      type: Boolean,
      default: false
    },
    fill: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      namespace: 'layui-btn'
    }
  },
  computed: {
    className () {
      return [
        `${this.namespace}`,
        {
          [`${this.namespace}-${this.type}`]: !!this.type,
          [`${this.namespace}-${this.size}`]: !!this.size,
          [`${this.namespace}-fluid`]: this.fluid,
          [`${this.namespace}-fill`]: this.fill
        }
      ]
    }
  },
  methods: {
    clickHandler () {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss">
@import "./../style/color.scss";
@import "./../style/fontSize.scss";
@import "./../style/mixin.scss";

$namespace:       layui-btn;

.#{$namespace}{
  display: inline-block;
  vertical-align: middle;
  height: 38px;
  line-height: 38px;
  padding: 0 18px;
  white-space: nowrap;
  text-align: center;
  @include  textSize;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  background-color: transparent;
  &:hover{
    opacity: 0.8;
    filter:alpha(opacity=80);
    color: $whiteColor;
  }
  &:active{
    opacity: 1;
    filter:alpha(opacity=100);
  }
  &-default{
    border: 1px solid $grayColor;
    color: $darkGrayColor;
  }
  &-primary{
    border: 1px solid $primaryColor;
    color: $primaryColor;
  }
  &-yellow{
    border: 1px solid $yellowColor;
    color: $yellowColor;
  }
  &-red{
    border: 1px solid $redColor;
    color: $redColor;
  }
  &-green{
    border: 1px solid $greenColor;
    color: $greenColor;
  }
  &-blue{
    border: 1px solid $blueColor;
    color: $blueColor;
  }
  &-default.#{$namespace}-fill{
    background-color: $lightGrayColor;
    color: $darkGrayColor;
  }
  &-primary.#{$namespace}-fill{
    background-color: $primaryColor;
    color: $whiteColor;
  }
  &-yellow.#{$namespace}-fill{
    background-color: $yellowColor;
    color: $whiteColor;
  }
  &-red.#{$namespace}-fill{
    background-color: $redColor;
    color: $whiteColor;
  }
  &-green.#{$namespace}-fill{
    background-color: $greenColor;
    color: $whiteColor;
  }
  &-blue.#{$namespace}-fill{
    background-color: $blueColor;
    color: $whiteColor;
  }
  &-lg{
    height: 44px;
    line-height: 44px;
    padding: 0 25px;
    @include titleSize;
  }
  &-sm{
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    @include linkSize;
  }
  &-fluid{
    width: 100%;
    text-align:center;
  }
}
</style>
