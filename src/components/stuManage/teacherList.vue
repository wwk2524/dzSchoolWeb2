<template>
  <div>
    <div slot="header" class="clearfix">
      <span>教师列表</span>
      <el-button size="mini" type="success" @click="add()">添加</el-button>
    </div>
    <br>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="teachername" label="姓名" width="120"></el-table-column>
      <el-table-column prop="teacherage" label="年龄" width="100"></el-table-column>
      <el-table-column prop="teachersxe" label="性别" width="100">
        <template slot-scope="scope">{{sexLabels[scope.row.teachersex] || ''}}</template>
      </el-table-column>
      <el-table-column prop="occupation" label="职业" width="140"></el-table-column>
      <el-table-column prop="telephone" label="电话" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          <!-- <el-button type="text" @click="goStuList(scope.row)">学生列表</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <br>
    <!-- <teacher-select v-model="tId"></teacher-select> -->
    <el-dialog :title="(isEdit ? '修改' : '新增')+'教师信息'" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :rules="rules" :model="table" label-width="80px">
        <el-form-item label="名称" prop="teachername">
          <el-input v-model="table.teachername"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="teacherage">
          <el-input v-model.number="table.teacherage"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="teachersex">
          <el-input v-model="table.teachersxe">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-input>
        </el-form-item>

        <el-form-item label="职业" prop="occupation">
          <el-input v-model="table.occupation"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="table.telephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="table.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-show="!isEdit" type="primary" @click="addTeacher()">确 定 新 增</el-button>
        <el-button v-show="isEdit" type="primary" @click="save()">确 定 修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "./api/stumanage";
import TeacherSelect from "@/components/common/select/teacherSelect.vue";
export default {
  name: "teacherList",
  components: {
    TeacherSelect
  },
  data() {
    return {
      tId: 2,
      tableData: [],
      table: {
        id: null,
        teachername: null,
        teacherage: null,
        teachersex: null,
        occupation: null,
        telephone: null,
        email: null
      },
      isEdit: false,
      dialogVisible: false,
      sexLabels: ["女", "男"],
      rules: {
        teachername: [
          { required: true, message: "请输入名字", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        teacherage: [
          { required: true, message: "年龄不能为空" },
          { type: "number", min: 18, max: 60, message: "请输入合法年龄" }
        ],
        occupation: [
          { required: true, message: "请输入职业", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码"
          }
        ]
      }
    };
  },
  methods: {
    //   获取教师列表
    getTableData() {
      api
        .TeacherLint()
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
    // 修改
    save() {
      api.infoTwo(this.table).then(resp => {
        if (resp.success) {
          this.dialogVisible = false;
          this.$message.success(resp.message);
          this.getTableData();
        }
      });
    },
    //增加
    add() {
      this.isEdit = false;
      this.dialogVisible = true;
      this.table = {
        id: null,
        teachername: null,
        teacherage: null,
        teachersxe: null,
        occupation: null,
        telephone: null,
        email: null
      };
    },
    //   新增
    addTeacher() {
      api.addTeacherInfo(this.table).then(resp => {
        if (resp.success) {
          this.dialogVisible = false;
          this.$message.success(resp.message);
          this.getTableData();
        }
      });
    },
    // 删除
    del(row) {
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
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
