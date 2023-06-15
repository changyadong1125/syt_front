import request from '~/utils/request'
export default {
  //获取支付二维码url
  nativePay(outTradeNo) {
    return request({
      url: `/front/order/weipay/url/${outTradeNo}`,
      method: 'get'
    })
  },
}