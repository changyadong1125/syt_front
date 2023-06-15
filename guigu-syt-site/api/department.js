import request from '~/utils/request'
const apiName = '/front/hosp/department'
export default {
  //查看医院科室
 getDepartmentListByHoscode(hoscode) {
    return request ({
        url: `${apiName}/children/${hoscode}`,
        method: 'get'
    })
  }
}