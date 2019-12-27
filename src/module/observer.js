function Observer(data) {
  this.data = data
  this.walk(data)
}
Observer.prototype = {
  walk: function (data) {
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  },
  defineReactive: function (data, key, val) {
    observer(val)
    const dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        return val
      },
      set(newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        dep.notify()
      }
    })
  }
}
export function Dep() {
  this.subs = []
}
Dep.prototype = {
  addSub: function (data) {
    this.subs.push(data)
  },
  notify: function () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
Dep.target = null
export function observer(data) {
  if (!data || typeof data !== 'object') {
    return
  }
  return new Observer(data)
}
export default Observer