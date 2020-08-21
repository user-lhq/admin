<template>
  <el-row :gutter="20">
    <el-col :span="10">有福同享有难退群教育科技股份有限公司</el-col>
    <el-col :span="5" :offset="5" class="el-fl">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img width="20px" :src="userInfo.photo" alt="">
          {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户设置</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  }
}
</script>
<style lang="less" scoped>
  .el-col {
    line-height: 60px;
  }
  .el-fl {
    float: right;
  }
  img {
    vertical-align: middle;
  }
</style>
