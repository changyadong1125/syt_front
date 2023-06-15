<template>
     <div class="app-container">
       <!-- 数据字典列表 -->
       <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children'}">
         <el-table-column label="名称" prop="name" />
         <el-table-column label="ID" prop="id" />
         <el-table-column label="值" prop="value" />
       </el-table>
     </div>
   </template>
   <script>
   import dictApi from '@/api/syt/dict'
   
   export default {
     // 定义数据
     data() {
       return {
         listLoading: true, // 是否显示loading信息
         list: [],
       }
     },
   
     // 当页面加载时获取数据
     created() {
       this.fetchData()
     },
   
     methods: {
       // 调用api层获取数据库中的数据
       fetchData() {
         dictApi.findAllDictList().then((response) => {
           this.list = response.data
           this.listLoading = false
         })
       },
     },
   }
   </script>