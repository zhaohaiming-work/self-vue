import SelfVue from './module/index'
export default function () {

  const v = new SelfVue({
    el: '#app',
    data: {
      title: 'hello world',
      name: 'canfoo'
    }
  })
  
  window.v = v
}