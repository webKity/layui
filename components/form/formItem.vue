<template>
  <div class="layui-form-item">
    <label class="layui-form-label">{{label}}</label>
    <div class="layui-form-block">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default{
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">

$namespace: layui-form;

.#{$namespace} {
  &-item{
    margin-bottom: 25px;
    clear: both;
  }
  &-label{
    display: inline-block;
    margin-bottom: 8px;
  }
  &-inline{
    .#{$namespace}-label{
      float: left;
      display: block;
      padding: 9px 15px;
      width: 80px;
      font-weight: 400;
      line-height: 20px;
      text-align: right;
      margin-bottom: 0;
    }
    .#{$namespace}-block{
      margin-left: 80px;
      min-height: 36px;
    }
  }
}
</style>
