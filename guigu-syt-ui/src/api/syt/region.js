import request from '@/utils/request'
const apiName = '/admin/cmn/region'
export default {
     findRegionListByParentCode(parentCode) {
       return request({
         url: `${apiName}/findRegionListByParentCode/${parentCode}`,
         method: 'get'
         
       })
     }
   }