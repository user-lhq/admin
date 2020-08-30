<template>
  <el-row :gutter="20">
    <el-col :span="10">北京顺义区传智播客教育科技股份有限公司</el-col>
    <el-col :span="5" :offset="5" class="el-fl">
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- <img width="20px" :src="userInfo.photo" alt=""> -->
          <img width="20px" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1671247724,3484152546&fm=26&gp=0.jpg" alt="">
          {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户设置</el-dropdown-item>
          <!-- 使用 .native 事件修饰符将原始的 html 事件注册到组件的根元素 -->
          <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
import { removeUser, getUser } from '@/utils/auth'
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
    this.userInfo = getUser()
  },
  methods: {
    handleLogout () {
      console.log('handleLogout')
      this.$confirm('此操作将退出当前登录, 是否继续?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清空本地存储中的 user_info
        // window.localStorage.removeItem('user_info')
        removeUser()
        // 跳转到登录页
        this.$router.push({ name: 'login' })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
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
