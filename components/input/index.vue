<template>
  <div class="layui-input">
    <div class="layui-input-befor">
      <slot name="before"></slot>
    </div>
    <input class="layui-input-self" />
    <div class="layui-input-after">
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import "../style/color.scss";
@import "../style/common.scss";

$namespace: layui-input;

.#{$namespace} {
  width: 100%;
  display: table;
  border: 1px solid $borderColor;
  border-radius: 2px;
  &:focus{
    border-color: $redColor;
  }
  &-before{
    padding: 0 10px;
    display: table-cell;
    border-right: 1px solid $borderColor;
    background-color: $lightGrayColor;
  }
  &-self{
    width: 100%;
    display: table-cell;
    height: 38px;
    line-height: 38px;
    padding-left: 10px;
    padding-right: 10px;
    border: none;
    outline: none;
  }
  &-after{
    padding: 0 10px;
    display: table-cell;
    border-left: 1px solid $borderColor;
    background-color: $lightGrayColor;
  }
}
</style>
