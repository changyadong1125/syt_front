import request from '~/utils/request'
const apiName = '/front/cmn/dict'
export default {
  //查看医院科室
  dictList(dictTypeId) {
    return request ({
        url: `${apiName}/list/${dictTypeId}`,
        method: 'get',
    })
  },
}