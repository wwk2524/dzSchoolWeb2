import Stulist from './stuList.vue'
import Classlist from './Classlist.vue'
import teacherList from './teacherList.vue'


var components = [
  Stulist,
  Classlist,
  teacherList
]

/* istanbul ignore next */
const install = function (Vue, opts) {
  components.map(c => {
    Vue.component(c.name, c)
  })
}


const routes = function () {
  return [
    { path: '/stu/list/:classId', name: 'Stulist', component: Stulist },
    { path: '/stu/list', name: 'Stulist', component: Stulist },
    { path: '/class/cs', name: 'Classlist', component: Classlist },
    { path: '/teacher/list', name: 'teacherList', component: teacherList } 
  ]
}

export default { install, routes }
