import request from '@/utils/request'

export default {

  save(patient) {
    return request({
      url: `/front/user/patient/save`,
      method: 'post',
      data: patient
    })
  },

  updateById(patient) {
    return request({
      url: `/front/user/patient/update`,
      method: 'put',
      data: patient
    })
  },

  getById(id) {
    return request({
      url: `/front/user/patient/detail/${id}`,
      method: 'get'
    })
  },

  findList() {
    return request({
      url: `/front/user/patient/all`,
      method: `get`
    })
  },

  removeById(id) {
    return request({
      url: `/front/user/patient/remove/${id}`,
      method: 'delete'
    })
  }
}