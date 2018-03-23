/**
 * v-outclick指令：当点击非绑定该指令的元素，或者该元素的子元素的时候触发
 */
export default {
  outclick: {
    bind (el, binding, vnode) {
      el['outclick'] = (function () {
        let el = null
        let binding = null
        let vnode = null
        return {
          set (elValue, bindingValue, vnodeValue) {
            el = elValue
            binding = bindingValue
            vnode = vnodeValue
          },
          handler (e) {
            if (vnode.context && !el.contains(e.target)) {
              vnode.context[binding.expression]()
            }
          }
        }
      })()

      el['outclick'].set(el, binding, vnode)
      document.addEventListener('click', el['outclick'].handler)
    },
    unbind (el) {
      document.removeEventListener('click', el['outclick'].handler)
    }
  }
}
