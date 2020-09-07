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
        <!--
          禁用路由缓存，只需要给 router-view 添加一个唯一的key 即可
          这样路由就不会去缓存组件了
          这个 key 要确保唯一
          禁用路由缓存不是必须的，看情况
          如果你要刻意使用默认的路由缓存能力，那么久不要禁用
        -->
        <router-view :key="$route.path"></router-view>
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
