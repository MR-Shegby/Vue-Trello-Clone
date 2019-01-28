import Vue from 'vue'

export const ClickOutside = {
  bind(el, binding) {
    el.addEventListener('click', e => e.stopPropagation())
    document.body.addEventListener('click', binding.value)
  },
  unbind(el, binding) {
    document.body.removeEventListener('click', binding.value)
  }
}

Vue.directive('click-outside', ClickOutside)