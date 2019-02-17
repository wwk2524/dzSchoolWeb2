import endpoint from '@/api/endpoint'
export default {
  /**
   * 获取学生列表
   */
  getStuList(p) {
    var path = '/stu/list'
    return endpoint.http().post(path,p).then(resp => resp.data).catch(error => {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    })

  },
    getStyById(id) {
    var path = '/stu/' + id
    return endpoint.http().post(path).then(resp => resp.data).catch(error => {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    })

  },
  addStu(data) {
    var path = '/stu/new'
    return endpoint.http().post(path, data).then(resp => resp.data).catch(error => {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    })
  },
  delStu(data) {
    var path = '/stu/del'
    return endpoint.http().post(path, data).then(resp => resp.data).catch(error => {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    })
  },
    /**
   * 获取班级列表
   */
  getClassList() {
    var path = '/class/cs'
    return endpoint.http().post(path).then(resp => resp.data).catch(error => {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    })

  },
  // 获取班主任信息
  options() {
    var path = '/class/teacher'
    return endpoint.http().post(path).then(resp => resp.data).catch(error => {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    })

  },
  //修改班级信息
  information(info){
    var path='class/info'
    return endpoint.http().post(path,info).then(resp => resp.data).catch(error => {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    })
  },
  // 新增班级信息
  addClassInfo(info){
    var path='class/add'
    return endpoint.http().post(path,info).then(resp => resp.data).catch(error => {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    })
  },
  // 删除班级信息
  getdelete(info){
    var path='class/del'
    return endpoint.http().post(path,info).then(resp => resp.data).catch(error => {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    })
  },
  //获取教师列表
  TeacherLint() {
    var path = '/class/teacher'
    return endpoint.http().post(path).then(resp => resp.data).catch(error => {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    })

  },
  // 修改教师信息
  infoTwo(info){
    var path='teacher/trInfo'
    return endpoint.http().post(path,info).then(resp => resp.data).catch(error => {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    })
  },
   // 新增教师信息
   addTeacherInfo(info){
    var path='teacher/increase'
    return endpoint.http().post(path,info).then(resp => resp.data).catch(error => {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    })
  },

}
