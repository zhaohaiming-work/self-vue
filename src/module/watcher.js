import { Dep } from './observer'
function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  this.value = this.get()
}
Watcher.prototype = {
  update() {
    const value = this.vm.data[this.exp]
    const oldValue = this.value
    if (value !== oldValue) {
      this.value = value
      this.cb.call(this.vm, value, oldValue)
    }
  },
  get() {
    Dep.target = this
    const value = this.vm.data[this.exp]
    Dep.target = null
    return value
  }
}
export default Watcher