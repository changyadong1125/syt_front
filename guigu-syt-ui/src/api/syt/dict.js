import request from '@/utils/request'
const apiName = '/admin/cmn/dict'
export default {

     findAllDictList() {
          return request({
            url: `${apiName}/findAll`,
            method: 'get',
          })
        },

}