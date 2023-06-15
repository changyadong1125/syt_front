<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchObj" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchData()">查询</el-button>
        <el-button type="primary" @click="clear()">清空</el-button>
      </el-form-item>
    </el-form>

    <template>
      <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" prop="hosname" label="医院名称" width="180">
        </el-table-column>

        <el-table-column align="center" prop="hoscode" label="医院编号" width="180">
        </el-table-column>

        <el-table-column align="center" prop="apiUrl" label="地址" width="180">
        </el-table-column>

        <el-table-column align="center" prop="contactsName" label="联系人" width="180">
        </el-table-column>

        <el-table-column align="center" prop="status" label="状态" width="180">
          <template slot-scope="scope">
            {{ scope.row.status == 1 ? "可用" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="'/syt/hospset/edit/' + scope.row.id">
              <el-button size="mini" type="primary" class="el-icon-edit" style="margin-right: 10px">修改</el-button>
            </router-link>

            <el-button size="mini" type="danger" class="el-icon-delete" @click="removeById(scope.row.id)">删除</el-button>
            <el-button v-if="scope.row.status == 1" size="mini" type="danger" class="el-icon-lock"
              @click="updateStatus(scope.row.id, 0, scope.$index)">锁定</el-button>

            <el-button v-if="scope.row.status == 0" size="mini" type="success" class="el-icon-lock"
              @click="updateStatus(scope.row.id, 1, scope.$index)">可用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button size="mini" type="danger" class="el-icon-delete" style="margin-top: 15px"
        @click="removeByList()">批量删除</el-button>
    </template>

    <el-pagination style="padding: 20px; text-align: center" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[1, 3, 6, 9]" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

     </div>
</template>
<script>
import hospsetApi from "@/api/syt/hospset.js";
export default {
  data() {
    return {
      message: "欢迎来到尚医通",
      pageNum: 1,
      pageSize: 3,
      searchObj: {},
      list: [],
      total: 0,
      multipleSelection: [],
    };
  },

  methods: {
    updateStatus(id, status, index) {
      hospsetApi.updateStatus(id, status).then((resp) => {
        this.$message.success(resp.message);
        this.list[index].status = status;
      });
    },
    removeByList(val) {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选中要删除的医院设置信息");
        return;
      }

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var ids = [];
          for (var i = 0; i < this.multipleSelection.length; i++) {
            var id = this.multipleSelection[i].id;
            ids.push(id);
          }

          return hospsetApi.batchRemove(ids);
        })
        .then((resp) => {
          this.$message.success(resp.message);
          this.fetchData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    searchData() {
      this.pageNum = 1;
      this.fetchData();
    },
    clear() {
      this.pageNum = 1;
      this.searchObj = {};
      this.fetchData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData(val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.fetchData(val);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    fetchData(pageNum = 1) {
      // 箭头函数支持this关键字
      hospsetApi
        .getPageList(pageNum, this.pageSize, this.searchObj)
        .then((resp) => {
          this.total = resp.data.total;
          this.list = resp.data.records;
        });
    },

    removeById(val) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return hospsetApi.removeById(val);
        })
        .then((resp) => {
          if (this.list.length === 1) {
            this.fetchData(this.pageNum - 1);
          } else {
            this.fetchData(this.pageNum);
          }
          this.$message.success(resp.message);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
