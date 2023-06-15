<template>
     <div class="app-container">
       <!-- 左侧部门选择 -->
       <el-card shadow="hover" style="width: 300px; margin-right: 20px;">
         <div slot="header" class="clearfix">
           <span>选择部门</span>
         </div>
         <el-tree class="dept-tree" :data="data" :props="defaultProps" @node-click="selectDept"/>
       </el-card>
   
       <!-- 右侧排班信息 -->
       <el-card shadow="hover" style="flex-grow: 1;">
         <div slot="header" class="clearfix">
           <span>排班信息</span>
         </div>
         <el-row class="date-row" style="height: 100px;">
           
           <el-tag v-for="(item, index) in bookingScheduleList"
                   :key="item.id"
                   @click="selectDate(item.workDate, index)"
                   :type="index == activeIndex ? 'success' : 'info'"
                   style="height: 60px; margin-right: 15px; cursor: pointer; line-height: 1.5;">
             <div>{{ item.workDate }}</div>
             <div>{{ item.dayOfWeek }}</div>
             <div>剩余号源：{{ item.availableNumber }} / 总号源：{{ item.reservedNumber }}</div>
           </el-tag>
   
         </el-row>
         <div style="margin-top: 20px;">
           <el-pagination v-if="total > 0"
                          :current-page="page"
                          :total="total"
                          :page-size="limit"
                          class="pagination"
                          layout="prev, pager, next"
                          align="center"
                          @current-change="changePage"/>
         </div>
   
         <div style="height: calc(100% - 180px); overflow-y: auto;">
           <el-table v-if="scheduleDetailList.length > 0"
                     :data="scheduleDetailList"
                     border
                     fit
                     highlight-current-row
                     style="width: 100%;"
                     class="schedule-table">
   
             <el-table-column label="序号" width="80" align="center">
               <template slot-scope="scope">
                 {{ scope.$index + 1 }}
               </template>
             </el-table-column>
   
             <el-table-column label="职称 / 医生姓名" width="200">
               <template slot-scope="scope">
                 {{ scope.row.title }} / 
                 {{ scope.row.docname }}
               </template>
             </el-table-column>
   
             <el-table-column prop="workTime" label="号源时间" :formatter="formatTime" width="120"/>
   
             <el-table-column prop="reservedNumber" label="可预约数" width="120">
               <template slot-scope="scope">
                 {{ scope.row.reservedNumber - scope.row.availableNumber }} / {{ scope.row.reservedNumber }}
               </template>
             </el-table-column>
   
             <el-table-column prop="amount" label="挂号费(元)" width="120"/>
             
             <el-table-column prop="skill" label="擅长技能"/>
           </el-table>
   
           <p v-if="scheduleDetailList.length == 0 && bookingScheduleList.length != 0" style="text-align: center;">
             暂无数据
           </p>
         </div>
   
       
         
       </el-card>
   
     </div>
   </template>
   
   <style scoped>
   .app-container {
     display: flex;
     height: calc(100vh - 100px);
     padding: 20px;
   }
   
   .date-row {
     overflow-y: auto;
   }
   
   .dept-tree {
     height: calc(100% - 18px);
     overflow-y: auto;
   }
   
   .schedule-table td {
     white-space: nowrap; /* 防止内容过长导致单元格换行 */
   }
   </style>
   
   <script>
   import deptApi from '@/api/syt/dept'
   import scheduleApi from '@/api/syt/schedule'
   
   export default {
     data() {
       return {
         data: [], //部门列表
         defaultProps: {
           children: 'children',
           label: 'depname',
         },
   
         hoscode: null, //医院编号
         depcode: null, //科室编号
         workDate: null, //选中的排班日期
         activeIndex: -1, //选中的排班日期的索引
   
         bookingScheduleList: [], //当前选中的科室下所显示的排班日期数据
         page: 1, // 当前页
         limit: 6, // 每页个数
         total: 0, // 总页码
   
         scheduleDetailList: [] //某一个日期下排班详情列表
       }
     },
   
     created() {
       this.hoscode = this.$route.params.hoscode
       this.fetchData()
     },
   
     methods: {
   
       //选择日期
       selectDate(workDate, index) {
         this.workDate = workDate
         this.activeIndex = index
         this.getDetailSchedule()
       },
   
       //日期翻页
       changePage(page) {
         this.page = page
         this.getScheduleRule()
       },
   
       //获取排班日期列表
       getScheduleRule() {
         this.workDate = null
         this.activeIndex = 0
         this.scheduleDetailList = []
   
         //调用api查询
         scheduleApi
           .getScheduleRule(this.page, this.limit, this.hoscode, this.depcode)
           .then((response) => {
             this.bookingScheduleList = response.data.list
             this.total = response.data.total
   
             // 如果当前总页数小于选中的页码，调整选中的页码
             if (this.total < this.page) {
               this.page = Math.max(this.total, 1)
               this.getScheduleRule() // 重新获取数据
               return
             }
   
             this.workDate = this.bookingScheduleList[0].workDate
             this.getDetailSchedule()
           })
       },
   
       //查询排班详情
       getDetailSchedule() {
         scheduleApi
           .getScheduleDetail(this.hoscode, this.depcode, this.workDate)
           .then((response) => {
             this.scheduleDetailList = response.data
           })
       },
   
       fetchData() {
         deptApi.getDeptByHoscode(this.hoscode).then((response) => {
           this.data = response.data
           if (this.data.length != 0) {
             this.depcode = this.data[0].children[0].depcode;
             this.getScheduleRule();
           }
         })
       },
   
       //选择部门
       selectDept(data) {
         // 科室大类直接返回，
         if (data.children != null) return
   
         this.depcode = data.depcode
         this.getScheduleRule()
       },
   
       // 格式化号源时间
       formatTime(row, column) {
         return row.workTime == 0 ? '上午' : '下午'
       }
     }
   }
   </script>
   