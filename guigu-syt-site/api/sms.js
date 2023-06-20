import request from '~/utils/request'

export default {

  sendCode(phone) {
    return request({
      url: `/front/yun/sms/code/${phone}`,
      method: `post`
    })
  }
}