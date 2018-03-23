<template>
  <div class="layui-swiper" ref="container">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    slidesPerView: {
      type: [Number, String],
      default: 1
    },
    margin: {
      type: [Number, String],
      default: 0
    },
    duration: {
      type: Number,
      default: 400
    },
    loop: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 防止重复初始化
      isInit: false,
      container: null,
      width: 0,
      items: [],
      itemWidth: 0,
      active: 0
    }
  },
  methods: {
    init () {
      if (this.isInit) return
      this.isInit = true
      this.container = this.$refs.container
      this.items = this.container.querySelectorAll('.layui-swiper-item')
      this.updateItemWidth()
      this.setTransform()
      this.setTransition('none')
      this.bindEvent()
    },
    updateItemWidth () {
      this.width = this.container.offsetWidth
      this.itemWidth = (this.width - (this.slidesPerView - 1) * this.margin) / this.slidesPerView
      this.resetItemWidth()
    },
    resetItemWidth () {
      this.items.forEach((item) => {
        item.style.width = this.itemWidth + 'px'
      })
    },
    setTransform () {
      this.items.forEach((item, i) => {
        let moveIndex = this.slidesPerView - this.active - 1 <= 0 ? this.slidesPerView - this.active - 1 : 0
        if (this.slidesPerView - this.active - 1 <= 0 && this.slidesPerView > 1 && this.active < this.items.length - 1) {
          moveIndex = moveIndex - 1
        }
        let distance = (i + moveIndex) * this.itemWidth + this.margin * i
        let transform = `translate3d(${distance}px, 0, 0)`
        item.style.webkitTransform = transform
        item.style.transform = transform
      })
    },
    setTransition (duration) {
      duration = duration || this.duration
      duration = typeof duration === 'number' ? (duration + 'ms') : duration
      this.items.forEach((item) => {
        item.style.webkitTransition = duration
        item.style.transition = duration
      })
    },
    bindEvent () {
      window.addEventListener('resize', this.reset)
    },
    reset () {
      this.isInit = false
      this.init()
    },
    prev () {
      let active = this.active
      active--
      this.goto(active)
    },
    next () {
      let active = this.active
      active++
      this.goto(active)
    },
    goto (active = 0) {
      this.active = this.setActive(active)
      this.$emit('change', this.active)
      this.setTransform()
      this.setTransition()
    },
    setActive (active = 0) {
      if (this.loop) {
        if (active >= this.items.length) {
          return 0
        } else if (active < 0) {
          return this.items.length - 1
        } else {
          return active
        }
      } else {
        if (active >= this.items.length) {
          return active - 1
        } else if (active < 0) {
          return active + 1
        } else {
          return active
        }
      }
    },
    destroy () {
      this.isInit = false
      this.setTransition('none')
      window.removeEventListener('resize', this.reset)
    }
  }
}
</script>
<style lang="scss">
@import "./../style/fontSize.scss";
@import "./../style/mixin.scss";

$namespace: layui-swiper;

.#{$namespace}{
  @include one-screen;
}
</style>
