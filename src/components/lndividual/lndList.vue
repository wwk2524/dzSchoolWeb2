<template>
  <div>
    <el-form ref="form" :model="form" label-width="100%">
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"></el-input>
        <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
        <el-form-item label="身份证">
        <el-input v-model="form.IDcard"></el-input>
        <el-form-item label="性别">
        <el-input v-model="form.sex"></el-input>
        <el-form-item label="生日">
        <el-input v-model="form.birthday"></el-input>
      </el-form-item>
      
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
        form:{
            nickname:null,
            name:null,
            IDcard:null,
            sex:null,
            birthday:null
        }
    };
  }
};
</script>

<style>
</style>

