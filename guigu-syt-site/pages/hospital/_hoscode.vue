<template>
     <div class="nav-container page-component">
       <!--左侧导航 #start -->
       <div class="nav left-nav">
         <div class="nav-item selected">
           <span class="v-link selected dark">预约挂号</span>
         </div>
         <div class="nav-item">
           <span class="v-link clickable dark">医院详情</span>
         </div>
         <div class="nav-item">
           <span class="v-link clickable dark">预约须知</span>
         </div>
         <div class="nav-item">
           <span class="v-link clickable dark">停诊信息</span>
         </div>
         <div class="nav-item">
           <span class="v-link clickable dark">查询/取消</span>
         </div>
       </div>
       <!-- 左侧导航 #end -->
       <!-- 右侧内容 #start -->
       <div class="page-container">
         <div class="hospital-home">
           <div class="common-header">
             <div class="title-wrapper">
               <span class="hospital-title">{{ hospital.hosname }}</span>
               <div class="icon-wrapper">
                 <span class="iconfont"></span>{{ hospital.param.hostypeString }}
               </div>
             </div>
           </div>
           <div class="info-wrapper">
             <img
               class="hospital-img"
               :src="'data:image/jpeg;base64,' + hospital.logoData"
               :alt="hospital.hosname"
             />
             <div class="content-wrapper">
               <div>挂号规则</div>
               <div class="line">
                 <div>
                   <span class="label">预约周期：</span
                   ><span>{{ bookingRule.cycle }}天</span>
                 </div>
                 <div class="space">
                   <span class="label">放号时间：</span
                   ><span>{{ bookingRule.releaseTime }}</span>
                 </div>
                 <div class="space">
                   <span class="label">停挂时间：</span
                   ><span>{{ bookingRule.stopTime }}</span>
                 </div>
               </div>
               <div class="line">
                 <span class="label">退号时间：</span>
                 <span v-if="bookingRule.quitDay == -1"
                   >就诊前一工作日{{ bookingRule.quitTime }}前取消</span
                 >
                 <span v-if="bookingRule.quitDay == 0"
                   >就诊前当天{{ bookingRule.quitTime }}前取消</span
                 >
               </div>
               <div style="margin-top: 20px">医院预约规则</div>
               <div class="rule-wrapper">
                 <ol>
                   <li v-for="item in bookingRule.rule" :key="item">
                     {{ item }}
                   </li>
                 </ol>
               </div>
             </div>
           </div>
           <div class="title select-title">选择科室</div>
           <div class="select-dept-wrapper">
             <div class="department-wrapper">
               <div class="hospital-department">
                 <div class="dept-list-wrapper el-scrollbar" style="height: 100%">
                   <div
                     class="dept-list el-scrollbar__wrap"
                     style="margin-bottom: -17px; margin-right: -17px"
                   >
                     <div class="el-scrollbar__view">
                       <div
                         class="sub-item"
                         v-for="(item, index) in departmentList"
                         :key="item.id"
                         :class="index == activeIndex ? 'selected' : ''"
                         @click="move(index)"
                       >
                         {{ item.depname }}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div class="sub-dept-container">
               <div
                 v-for="(item, index) in departmentList"
                 :key="item.id"
                 v-show="index == activeIndex"
                 class="sub-dept-wrapper"
                 :id="item.depcode"
               >
                 <div class="sub-title">
                   <div class="block selected"></div>
                   {{ item.depname }}
                 </div>
                 <div class="sub-item-wrapper">
                   <div
                     v-for="it in item.children"
                     :key="it.id"
                     class="sub-item"
                     @click="schedule(it.depcode)"
                   >
                     <span class="v-link clickable">{{ it.depname }} </span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
       <!-- 右侧内容 #end -->
     </div>
   </template>
   <script>
   import '~/assets/css/hospital_personal.css'
   import cookie from 'js-cookie'
   import userInfoApi from '~/api/userInfo'
   import '~/assets/css/hospital.css'
   import hospApi from '~/api/hospital'
   import departmentApi from '~/api/department'
   export default {
     async asyncData(page) {
       const hoscode = page.route.params.hoscode
       //获取医院详情
       const hospitalResponse = await hospApi.getHospitalDetail(hoscode)
       //获取所有科室
       const departmentResponse = await departmentApi.getDepartmentListByHoscode(hoscode)
       return {
         hospital: hospitalResponse.data,
         bookingRule: hospitalResponse.data.bookingRule,
         departmentList: departmentResponse.data,
       }
      },
      data () {
           return {
               activeIndex: 0
           }
      },
       methods: {
           
           move(index){
               this.activeIndex = index
           },
           schedule(depcode) {
            //验证又没登录
              if(cookie.get("refreshToken")){
                userInfoApi.getUserInfo().then(resp=>{
                    if(resp.data.authStatus==2){
                      //认证是否通过
                      window.location.href='/hospital/schedule?hoscode='+this.$route.params.hoscode

                    }else{
                      window.location.href="/user"
                    }
                })



              }else{
                window.location.href=process.env.BASE_API+"/front/user/wx/login"

              }




               window.location.href = '/hospital/schedule?hoscode=' + this.$route.params.hoscode + "&depcode="+ depcode
           }
       }
   }
   </script>