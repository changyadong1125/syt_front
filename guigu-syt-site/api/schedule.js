import request from '~/utils/request'
const apiName = '/front/hosp/schedule'
export default {
  
     getBookingScheduleRule(page, limit, hoscode, depcode){
          return request({
               url: `${apiName}/page/${page}/${limit}/${hoscode}/${depcode}`,
               method: 'get',

          })
     }, 
     findScheduleList(hoscode, depcode, workDate){
          return request({
               url: `${apiName}/getScheduleDetail/${hoscode}/${depcode}/${workDate}`,
               method: 'get',
          })
     },
     getScheduleDetail(id){
          return request({
               url: `${apiName}/info/${id}`,
               method: 'get',
          })
     }
  
}