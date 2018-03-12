<template>
  <div class="layui-laydate">
    <layui-date-main v-model="date" :lang="lang" @onchange="changeHandler"></layui-date-main>
    <layui-date-main v-if="type === 'dateRange'" v-model="nextMonth" :lang="lang" @onchange="changeHandler"></layui-date-main>
  </div>
</template>

<script>
import layuiDateMain from './main.vue'
import {each} from './../utils'

export default{
  props: {
    type: {
      type: String,
      default: 'date'
    },
    lang: {
      type: String,
      default: 'cn'
    },
    value: {
      type: Date,
      default () {
        return new Date()
      }
    }
  },
  data () {
    return {
      date: null,
      startTime: null,
      endTime: null,
      range: []
    }
  },
  computed: {
    nextMonth () {
      let year = this.date.getFullYear()
      let month = this.date.getMonth() + 1
      let date = this.date.getDate()
      let next = new Date(year, month, date)
      return next
    }
  },
  components: {
    layuiDateMain
  },
  methods: {
    changeHandler (val) {
      if (this.startTime && this.endTime) {
        this.startTime = null
        this.endTime = null
      }
      if (this.type !== 'date' && this.startTime) {
        this.endTime = val
        this.stampRange()
      } else {
        this.startTime = val
      }
    },
    stampRange () {
      let startTime = this.startTime.getTime()
      let endTime = this.endTime.getTime()

      if (startTime > endTime) {
        let temp = startTime
        startTime = endTime
        endTime = temp
        temp = this.startTime
        this.startTime = this.endTime
        this.endTime = this.startTime
      }

      this.setRange(startTime, endTime)
      each(this.range, (item, i) => {
        console.log(item)
      })
    },
    setRange (startTime, endTime) {
      let oneDay = 1000 * 60 * 60 * 24
      var dates = Math.abs((startTime - endTime)) / oneDay
      for (let i = 0; i <= dates; i++) {
        this.range.push(new Date(startTime + oneDay * i))
      }
    }
  },
  created () {
    this.date = this.value
  }
}
</script>

<style lang="scss">
@import "../style/color.scss";
@import "../style/fontSize.scss";
@import "../style/mixin.scss";

$namespace: layui-laydate;

.#{$namespace} {
  position: absolute;
  z-index: 66666666;
  margin: 5px 0;
  border-radius: 2px;
  @include textSize;
  @include shadow;
  background-color: $whiteColor;
}
</style>
