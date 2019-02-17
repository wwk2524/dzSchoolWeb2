<template>
  <div>
    <div slot="header" class="clearfix">
      <span>班级列表</span>
      <el-button size="mini" type="success" @click="add()">增加</el-button>
    </div>
    <br>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="classname" label="班级名称" width="180"></el-table-column>
      <el-table-column prop="classsize" label="班级人数" width="180"></el-table-column>
      <el-table-column prop="teacher" label="班主任" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          <el-button type="text" @click="goStuList(scope.row)">学生列表</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>

    <!-- <router-link to="/teacher/list"><el-button type="text" >教师列表</el-button></router-link> -->
    <el-dialog :title="(isEdit ? '修改' : '新增')+'班级信息'" :visible="dialogVisible" width="30%">
      <el-form ref="form" :model="table" label-width="80px">
        <el-form-item label="班级名称">
          <el-input v-model="table.classname"></el-input>
        </el-form-item>
        <el-form-item label="班级人数">
          <el-input v-model="table.classsize"></el-input>
        </el-form-item>
        <el-form-item label="班主任">
          <el-select v-model="table.teacher" placeholder="请选择">
            <el-option
              v-for="item in teacherList"
              :key="item.value"
              :label="item.teachername"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-show="!isEdit" type="primary" @click="addClass">确 定 新 增</el-button>
        <el-button v-show="isEdit" type="primary" @click="save">确 定 修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "./api/stumanage";
export default {
  name: "Classlist",
  data() {
    return {
      tableData: [],
      table: {
        id: null,
        classname: null,
        classsize: null,
        teacher: null
      },
      dialogVisible: false,
      teacherList: [],
      teachername: null,
      isEdit: false,
      linkStr: null
    };
  },
  methods: {
    getTeacher(id) {
      this.table.teacher = id;
    },
    // 跳转学生列表
    goStuList(row) {
      // this.$router.push({ path: "/stu/list" });
      this.$router.push({ path: "/stu/list/" + row.id });
    },
    // 新增
    addClass() {
      api.addClassInfo(this.table).then(resp => {
        if (resp.success) {
          this.dialogVisible = false;
          this.$message.success(resp.message);
          this.getTableData();
        }
        this.linkStr = "/stu/list/6";
      });
    },
    // 修改
    save() {
      api.information(this.table).then(resp => {
        if (resp.success) {
          this.dialogVisible = false;
          this.$message.success(resp.message);
          this.getTableData();
        }
      });
    },
    // 查询班级列表
    getTableData() {
      api
        .getClassList()
        .then(resp => {
          if (resp.success) {
            this.tableData = resp.data;
          }
        })
        .catch(err => {
          this.$message("" + err);
        });
    },
    // 编辑
    edit(row) {
      this.isEdit = true;
      this.table = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    //增加
    add(row) {
      this.isEdit = false;
      this.dialogVisible = true;
      this.table = {
        id: null,
        classname: null,
        classsize: null,
        teacher: null
      };
    },
    // 删除
    del(row) {
      console.log(row);
      this.$confirm("是否全部删除", "提示", {
        // confirmButtonText: "确定",
        // cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.getdelete({ id: row.id }).then(resp => {
          if (resp.success) {
            this.$message({ type: "success", message: "删除成功!" });
            this.getTableData();
          }
        });
      });
    },
    //  查询教师列表
    getoptions() {
      api.options().then(resp => {
        if (resp.success) {
          this.teacherList = resp.data;
        }
      });
    }
  },
  created() {
    this.getTableData();
    this.getoptions();
  }
};
</script>