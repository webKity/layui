// Thanks to https://github.com/ElemeFE/element/blob/dev/src/transitions/collapse-transition.js
import { tween, styler, easing } from 'popmotion'
const SPEED = 300
const DISTANCE = 50
let direction = 'top'
let parentHeight = 0

function getScrollTop (el) {
  while (el.scrollTop === 0 && el.parentNode) {
    el = el.parentNode
  }
  return el.scrollTop
}

function animated (options) {
  let defaultConfig = {
    el: null,
    inOrOut: 'in',
    complate: function () {}
  }
  options = Object.assign(defaultConfig, options)
  let elStyler = styler(options.el)
  let from = {}
  let to = {}
  if (options.inOrOut === 'in') {
    from.opacity = 0
    from[direction] = parentHeight + DISTANCE
    to[direction] = parentHeight
    to.opacity = 1
  } else {
    from.opacity = 1
    from[direction] = parentHeight
    to.opacity = 0
    to[direction] = parentHeight + DISTANCE
  }
  tween({
    from: from,
    to: to,
    ease: easing.easeInOut,
    duration: SPEED
  }).start((update) => {
    elStyler.set(update)
    if (JSON.stringify(update) === JSON.stringify(to)) {
      options.complate()
    }
  })
}

const Transition = {
  enter (el, done) {
    let parent = el.parentNode
    let parentTop = parent.offsetTop
    parentHeight = parent.offsetHeight
    let dlHeight = el.offsetHeight
    let boxScrollTop = getScrollTop(el)
    let viewHeight = document.documentElement.clientHeight

    let top = parentTop + parentHeight + 5 - boxScrollTop
    if (top + dlHeight > viewHeight && top >= dlHeight) {
      el.style.bottom = parentHeight + 'px'
      el.style.top = 'auto'
      direction = 'bottom'
    } else {
      el.style.top = parentHeight + 'px'
      el.style.bottom = 'auto'
      direction = 'top'
    }

    animated({
      el: el
    })
  },
  leave (el, done) {
    animated({
      el: el,
      inOrOut: 'out',
      complate: done
    })
  }
}

export default {
  name: 'dropTransition',
  functional: true,
  render (h, { children }) {
    const data = {
      on: Transition
    }

    return h('transition', data, children)
  }
}
