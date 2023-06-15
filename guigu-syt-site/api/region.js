import request from '~/utils/request'
const apiName = '/front/cmn/region'
export default {
  //查看医院科室
  regionList(parentCode) {
    return request ({
        url: `${apiName}/list/${parentCode}`,
        method: 'get',
    })
  },
}