import request from '~/utils/request'
//引入js-cookie
import cookie from 'js-cookie'
const apiName = '/front/user/userInfo'
export default {
  
  getUserInfo() {
    return request ({
        url: `${apiName}/getUserAuthInfo`,
        method: 'get',
     
    })
  },
  saveUserAuth(userAuth) {
     return request({
       url: `${apiName}/auth`,
       method: 'put',
       data: userAuth,
     })
   },
 
}