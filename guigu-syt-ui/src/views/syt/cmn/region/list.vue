<template>
  <div class="app-container">
    <div style="margin-bottom:5px;">
    <el-button type="success" icon="el-icon-top" size="mini" @click="exportData"><i class="fa fa-plus" />导出</el-button>
    <el-button type="primary" icon="el-icon-bottom" size="mini" @click="importData"><i class="fa fa-plus" />导入</el-button>
</div>
<el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
    <el-form label-position="right" label-width="100px">
        <el-form-item label="请选择文件">
            <!-- 注意：这里使用headers属性传递了token -->
            <el-upload
                       v-loading="uploadLoading"
                       element-loading-text="数据导入中"
                       :headers="{ token }"
                       :multiple="false"
                       :on-progress="onUploadProgress"
                       :on-success="onUploadSuccess"
                       :on-error="onUploadError"
                       :action="VUE_APP_BASE_API + '/admin/cmn/region/upload'">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                    只能上传xls文件，且不超过1M
                </div>
            </el-upload>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">取消</el-button>
    </div>
</el-dialog>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      :load="getChildren"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%;margin-top: 10px;"
      row-key="id"
      border
      lazy>

      <el-table-column label="名称" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地区编码" >
        <template slot-scope="{row}">
          {{ row.code }}
        </template>
      </el-table-column>
      <el-table-column label="地区级别" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.level }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import regionApi from '@/api/syt/region'
import store from '@/store'
import axios from 'axios'

export default {

  // 定义数据
  data() {
    return {
      listLoading: true,  
      list: [],
      dialogImportVisible: false,
uploadLoading: false, //文件上传状态
VUE_APP_BASE_API: process.env.VUE_APP_BASE_API, //接口地址
token: store.getters.token,
    }
  },

  // 当页面加载时获取数据
  created() {
    this.fetchData()
  },

  methods: {
       //显示一个文件选择对话框
       importData() {
      this.dialogImportVisible = true
    },
        
    //文件上传中
    onUploadProgress(){
      this.uploadLoading = true
    },        
        
    onUploadSuccess(response) {
        
      this.uploadLoading = false
        
      //文件导入成功
      if (response.code === 200) {
        this.$message.success(response.message)
        this.dialogImportVisible = false
        this.fetchData()
      } else {
        //导入失败
        this.$message.error(response.message)
        this.dialogImportVisible = false
      }
    },
        
    //导入失败
    onUploadError() {
      this.uploadLoading = false  
      this.$message.error('系统错误')
      this.dialogImportVisible = false
    },
    exportData() {
      //此种方式无法传递token
      //window.open(process.env.VUE_APP_BASE_API + '/admin/cmn/region/exportData')
       
      //使用当前方式传递token
      const config = {
          method: 'get',
          url: '/dev-api/admin/cmn/region/download',
          headers: {
            'token': store.getters.token //
          },
          responseType: 'blob'
        }
      axios(config).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', '数据字典.xlsx')
          document.body.appendChild(link)
          link.click()
      })
    },
    // 调用api层获取数据库中的数据
    fetchData() {
      console.log('加载列表')
      regionApi.findRegionListByParentCode('0').then(response => {
        debugger
        this.list = response.data
        console.log(this.list)
        this.listLoading = false
      })
    },

    getChildren(tree, treeNode, resolve) {
      debugger
      regionApi.findRegionListByParentCode(tree.code).then(response => {
        resolve(response.data)
      })
    },
  }
}
</script>