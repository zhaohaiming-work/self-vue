import fun from './entry'
fun()
if (module.hot) {
  module.hot.accept(['./entry.js'], fun)
}