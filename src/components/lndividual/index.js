import lndList from  "./lndList.vue"


var components = [
    lndList
]



const install = function (Vue, opts) {
    components.map(c => {
      Vue.component(c.name, c)
    })
  }


  const routes = function () {
    return [
    { path: '', name: 'lndList', component: lndList },
    ]
  }

  export default { install, routes }