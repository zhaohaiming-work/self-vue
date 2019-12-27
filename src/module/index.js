import Compile from './compile'
import { observer } from './observer'
function SelfVue(options) {
  this.data = options.data
  this.methods = options.methods
  Object.keys(this.data).forEach(key => {
    this.proxyKeys(key)
  })
  observer(this.data)
  new Compile(options.el, this)
}
SelfVue.prototype = {
  proxyKeys: function (key) {
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get() {
        return this.data[key];
      },
      set(newVal) {
        this.data[key] = newVal;
      }
    })
  }
}
export default SelfVue