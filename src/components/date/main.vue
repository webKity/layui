<template>
  <div class="layui-laydate-main">
    <div class="layui-laydate-header">
      <i class="layui-laydate-icon layui-icon-prev" style="left: 15px;" @click="changeYear(-1)"></i>
      <i class="layui-laydate-icon layui-icon-left" style="left: 45px;" @click="changeMonth(-1)"></i>
      <div class="layui-laydate-set-ym">
        <span>{{year}}年</span>
        <span>{{month}}月</span>
      </div>
      <i class="layui-laydate-icon layui-icon-right" style="right: 45px;" @click="changeMonth(1)"></i>
      <i class="layui-laydate-icon layui-icon-next" style="right: 15px;" @click="changeYear(1)"></i>
    </div>
    <div class="layui-laydate-content">
      <table>
        <thead>
          <tr>
            <th v-for="(week, index) in langs[lang].weeks">{{week}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tr, index) in trs" :key="index">
            <td v-for="(td, i) in tr" :class="{'active': td.value === activeDate, 'this': td.month === 'same'}" @click="changeDay(td)">{{td.label}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const R = require('ramda')

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
      activeDate: null,
      initDate: null,
      year: null,
      month: null,
      day: null,
      langs: {
        cn: {
          weeks: ['日', '一', '二', '三', '四', '五', '六'],
          time: ['时', '分', '秒'],
          timeTips: '选择时间',
          startTime: '开始时间',
          endTime: '结束时间',
          dateTips: '返回日期',
          month: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
          tools: {
            confirm: '确定',
            clear: '清空',
            now: '现在'
          }
        },
        en: {
          weeks: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          time: ['Hours', 'Minutes', 'Seconds'],
          timeTips: 'Select Time',
          startTime: 'Start Time',
          endTime: 'End Time',
          dateTips: 'Select Date',
          month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          tools: {
            confirm: 'Confirm',
            clear: 'Clear',
            now: 'Now'
          }
        }
      },
      trs: {}
    }
  },
  watch: {
    initDate (val) {
      this.initMain()
    }
  },
  methods: {
    initMain () {
      this.year = this.initDate.getFullYear()
      this.month = this.initDate.getMonth() + 1
      this.day = this.initDate.getDate()
      this.trs = this.getDays(this.initDate)
    },
    getDays (date) {
      let startWeek = this.getMonthFirstDayWeek(date)
      let prevMaxDate = this.getEndDate(date.getMonth(), date.getFullYear())
      let thisMaxDate = this.getEndDate(date.getMonth(), date.getFullYear())
      let days = []
      // 上个月日期入栈
      for (let i = startWeek - 1; i >= 0; i--) {
        let day = prevMaxDate - i
        let temp = {}
        temp.month = 'prev'
        temp.value = this.year + '-' + (this.month - 1) + '-' + day
        temp.label = day
        days.push(temp)
      }
      // 当前月日期入栈
      for (let i = 0; i < thisMaxDate; i++) {
        let day = i + 1
        let temp = {}
        temp.month = 'same'
        temp.value = this.year + '-' + this.month + '-' + day
        temp.label = day
        days.push(temp)
      }
      // 下个月日期入栈
      for (let i = 0, len = days.length; i < 42 - len; i++) {
        let day = i + 1
        let temp = {}
        temp.month = 'next'
        temp.value = this.year + '-' + (this.month + 1) + '-' + day
        temp.label = day
        days.push(temp)
      }
      // 把数组按照每部分七个进行分组
      return R.splitEvery(7)(days)
    },
    getMonthFirstDayWeek (date) {
      date.setFullYear(date.getFullYear(), date.getMonth(), 1)
      return date.getDay()
    },
    getEndDate (month, year) {
      var thisDate = new Date()
      // 设置日期为下个月的第一天
      thisDate.setFullYear(
        year || thisDate.getFullYear(),
        month || (thisDate.getMonth() + 1)
      , 1)
      // 减去一天，得到当前月最后一天
      return new Date(thisDate.getTime() - 1000 * 60 * 60 * 24).getDate()
    },
    changeMonth (offset) {
      this.initDate = new Date(this.initDate.setFullYear(this.year, this.month + offset - 1, this.initDate.getDate()))
      this.$emit('input', this.initDate)
    },
    changeYear (offset) {
      this.initDate = new Date(this.initDate.setFullYear(this.year + offset, this.month - 1, this.initDate.getDate()))
      this.$emit('input', this.initDate)
    },
    changeDay (val) {
      let args = val.value.split('-')
      let year = args[0]
      let month = args[1]
      let day = args[2]
      this.activeDate = year + '-' + month + '-' + day
      let thisDay = new Date(this.initDate.setFullYear(year, month - 1, day))
      this.$emit('onchange', thisDay)
    }
  },
  created () {
    this.initDate = this.value
    this.initMain()
  }
}
</script>

<style lang="scss">
@import "../style/color.scss";
@import "../style/fontSize.scss";

$namespace: layui-laydate;

.#{$namespace} {
  &-main{
    display: inline-block;
    width: 272px;
    color: $grayColor;
  }
  &-header{
    padding: 5px 70px 5px;
    border-bottom: 1px solid $borderColor;
    line-height: 30px;
    i{
      position: absolute;
      top: 10px;
      color: #999;
      @include h6Size;
      cursor: pointer;
      &:hover{
        color: $primaryColor;
      }
    }
  }
  &-set-ym{
    width: 100%;
    display: inline-block;
    vertical-align: bottom;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    @include titleSize;
  }
  &-set-ym span{
    padding: 0 5px;
    cursor: pointer;
    &:hover{
      color: $primaryColor;
    }
  }
  &-content{
    padding: 10px;
    th{
      font-weight: normal;
      color: $blackColor;
    }
    th, td{
      width: 36px;
      height: 30px;
      padding: 5px;
      text-align: center;
    }
    td{
      position: relative;
      cursor: pointer;
      color: $disableColor;
      &:hover{
        background-color: $lightGrayColor;
      }
      &.this{
        color: $blackColor;
      }
      &.active{
        background-color: $primaryColor;
        color: $whiteColor;
      }
    }
  }
}
</style>
