<template>
  <el-container>
  <el-header>添加/修改医院设置信息</el-header>
  <el-main>
     <el-form
        label-width="180px"
       
        :model="hospset"
        :rules="rules"
        ref="hospset"
     
      >
        <el-form-item label="医院名称" >
          <el-input v-model="hospset.hosname" />
        </el-form-item>
        <el-form-item label="医院编号">
          <el-input v-model="hospset.hoscode" />
        </el-form-item>
        <el-form-item label="api地址">
          <el-input v-model="hospset.apiUrl" />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="hospset.contactsName" />
        </el-form-item>
        <el-form-item label="电话" prop="contactsPhone">
          <el-input v-model="hospset.contactsPhone" maxlength="11" />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="saveBtnDisabled"
            type="primary"
            @click="saveOrUpdate"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
  </el-main>
</el-container>

    
<!--医院设置表单-->
</template>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
<script>
import hospsetApi from "@/api/syt/hospset";
import router from "@/router";
import Item from '@/layout/components/Sidebar/Item.vue';
export default {
  components: { Item },
  data() {
    var validatecontactsPhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("手机号有误"));
        this.saveBtnDisabled = false;
      } else {
        callback();
      }
    };
    return {
      hospset: {},

      saveBtnDisabled: false, // 保存按钮是否禁用,
      rules: {
        contactsPhone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { validator: validatecontactsPhone, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    saveOrUpdate() {
      this.saveBtnDisabled = true;

      if (!this.hospset.id) {
        this.saveData();
      } else {
        hospsetApi.updateById(this.hospset).then((resp) => {
          this.$message.success(resp.message);
        

        });
        this.$router.push({ path: "/syt/hospset/list" });
      }
    },
    // 保存
    saveData() {

      
      this.$refs['hospset'].validate((valid) => {
          if (valid) {
            this.saveBtnDisabled = false;
            hospsetApi.save(this.hospset).then((response) => {
              debugger
        this.$message.success(response.message);
      
        this.$router.push({ path: "/syt/hospset/list" });
      })
          } else {
          this.$message.error("erro submit")
          this.saveBtnDisabled = false;
            return false;
          }
        });
    },
  },
  created() {
    var id = this.$route.params.id;
    if (id) {
      hospsetApi.edit(this.$route.params.id).then((resp) => {
        this.hospset = resp.data;
      });
    }
  },
};
</script>