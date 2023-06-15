import request from '@/utils/request'
const apiName = '/admin/hosp/hospitalSet'
export default {
  //医院设置列表
  getPageList(page, limit, searchObj) {
    return request({
      url: `${apiName}/page/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  removeById(id){
     return request({
          url:`${apiName}/remove/${id}`,
          method: "delete"
     })
  },
  batchRemove(ids) {
     return request({
         url: `${apiName}/batchRemove`,
         method: 'delete',
         data: ids
     })
 },
 save(hospset){
     return request({
          url: `${apiName}/save`,
          method: 'post',
          data:hospset
     })
 },
 updateById(hospset) {
     return request({
         url: `${apiName}/update`,
         method: 'put',
         data: hospset
     })
 },
 edit(id){
     return request({
          url: `${apiName}/edit/${id}`,
          method: 'get'
     })

 },
 updateStatus(id,status){
     return request({
          url: `${apiName}/status/${id}/${status}`,
          method: 'get'
     })
 }
}