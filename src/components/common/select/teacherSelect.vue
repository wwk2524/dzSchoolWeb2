<template>
  <el-select v-model="id" placeholder="请选择" @change="throwId">
    <el-option v-for="item in options" :key="item.id" :label="item.teachername" :value="item.id"></el-option>
  </el-select>
</template>
<script>
import api from "@/components/stuManage/api/stumanage";
export default {
  props: ['pId'],
  data() {
    return {
      options: [],
      id: null
    };
  },
  methods: {
    getOptions() {
      api.options().then(resp => {
        if (resp.success) {
          this.options = resp.data;
        }
      });
    },
    throwId(val) {
      console.log(val);
      this.$emit("input", val);
    }
  },
  created() {
    this.getOptions();
    this.id = this.pId;
  }
};
</script>
