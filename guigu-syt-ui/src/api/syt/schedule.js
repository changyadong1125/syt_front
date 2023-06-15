import request from '@/utils/request'
const apiName = '/admin/hosp/schedule'
export default {
  //查看排班
  getScheduleRule(page, limit, hoscode, depcode) {
    return request ({
        url: `${apiName}/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
        method: 'get'
    })
  },
  getScheduleDetail(hoscode, depcode, workDate) {
     return request({
         url: `${apiName}/getScheduleDetail/${hoscode}/${depcode}/${workDate}`,
         method: 'get'
     })
 }
}