<template>
  <!-- <div class="layout-wrap">
  </div> -->
  <el-container>
    <el-aside width="200px">
      <!-- 侧边栏 -->
      <AppAside/>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 头部 -->
        <AppHeader/>
      </el-header>
      <el-main>
        <!-- Home、发布文章、文章列表、评论显示到这里 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
  name: 'layout',
  components: {
    AppAside,
    AppHeader
  },
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
  .el-container {
    height: 100%;
    .el-aside {
      background: #343a46;
    }
    .el-header {
      background: pink;
    }
    .el-main {
      background:skyblue;
    }
  }
</style>
