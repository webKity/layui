// Thanks to https://github.com/ElemeFE/element/blob/dev/src/transitions/collapse-transition.js
import { tween, styler, easing } from 'popmotion'
const SPEED = 300

const Transition = {
  enter (el, done) {
    let elStyler = styler(el)
    let from = {height: 0}
    let to = {height: el.scrollHeight}
    tween({
      from: from,
      to: to,
      ease: easing.easeInOut,
      duration: SPEED
    }).start(elStyler.set)
  },
  leave (el, done) {
    let elStyler = styler(el)
    let from = {height: el.scrollHeight}
    let to = {height: 0}
    tween({
      from: from,
      to: to,
      ease: easing.easeInOut,
      duration: SPEED
    }).start((update) => {
      elStyler.set(update)
      if (JSON.stringify(update) === JSON.stringify(to)) {
        done()
      }
    })
  }
}

export default {
  name: 'collapseTransition',
  functional: true,
  render (h, { children }) {
    let data = {
      on: Transition
    }

    return h('transition', data, children)
  }
}
