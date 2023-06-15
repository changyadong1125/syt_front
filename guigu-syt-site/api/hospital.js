import request from '~/utils/request'
const apiName = '/front/hosp/hospital'
export default {
  //查看医院科室
 hospitalList(searchObj) {
    return request ({
        url: `${apiName}/list`,
        method: 'get',
        params: searchObj
    })
  },
  getHospitalDetail(hoscode){
    return request({
      url: `${apiName}/detail/${hoscode}`,
      method: "get"
    })
  }
}