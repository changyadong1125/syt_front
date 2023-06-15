import request from '@/utils/request'

const apiName = '/admin/user/userInfo'
export default {
  //医院列表
  getPageList(pageNum, pageSize, objVo) {
    return request ({
      url: `${apiName}/page/${pageNum}/${pageSize}`,
      method: 'get',
      params: objVo
    })
  },
  isApproval(id, authStatus){
     return request ({
          url: `${apiName}/approval/${id}/${authStatus}`,
          method: 'get',
        })
  },
 
  lock(id, status){
     return request ({
          url: `${apiName}/lock/${id}/${status}`,
          method: 'get',
        })
  },
}