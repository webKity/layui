<template>
  <div class="index">
    <router-link to="/about">关于我们</router-link>
    <layui-select :options="options"></layui-select>
    <layui-select :options="options"></layui-select>
    <layui-select :options="options"></layui-select>
  </div>
</template>

<script>
import {layuiSwiper, layuiSwiperItem} from '@/components/swiper'
import layuiSelect from '@/components/select'

export default {
  components: {layuiSwiper, layuiSwiperItem, layuiSelect},
  data () {
    return {
      imgs: [
        {src: 'http://chzflive.caihome.cn/web/o_1c8u44kl119pirn819kbm411b5fb9'},
        {src: 'http://chzflive.caihome.cn/web/o_1br168dn9ve114fcgb10vqpct25'},
        {src: 'http://chzflive.caihome.cn/web/o_1c8u44kl119pirn819kbm411b5fb9'}
      ],
      options: [
        {label: '测试1', value: 1},
        {label: '测试2', value: 2}
      ]
    }
  },
  methods: {
    prev () {
      this.$refs.bander.prev()
    },
    next () {
      this.$refs.bander.next()
    }
  }
}
</script>

<style lang="scss">
.index{
  .index-swiper-prev, .index-swiper-next{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 20px;
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
    z-index: 1;
    cursor: pointer;
    &:hover{
      opacity: 0.7;
    }
  }
  .index-swiper-prev{
    left: 0;
  }
  .index-swiper-next{
    right: 0;
  }
  .layui-swiper-item{
    width: 700px;
    height: 500px;
  }
}
</style>
