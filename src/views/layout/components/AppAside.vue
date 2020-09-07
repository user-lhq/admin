<template>
  <!-- <div>
    <p>AppAside</p>
  </div>
  @open="handleOpen"
  @close="handleClose"
  -->
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>
    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item index="/publish">
        <i class="el-icon-menu"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-menu"></i>
        <span slot="title">内容列表</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-menu"></i>
        <span slot="title">评论列表</span>
      </el-menu-item>
      <el-menu-item index="/media">
        <i class="el-icon-menu"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>粉丝管理</span>
      </template>
      <el-menu-item index="2-1">
        <i class="el-icon-menu"></i>
        <span slot="title">图文数据</span>
      </el-menu-item>
      <el-menu-item index="2-2">
        <i class="el-icon-menu"></i>
        <span slot="title">粉丝概况</span>
      </el-menu-item>
      <el-menu-item index="2-3">
        <i class="el-icon-menu"></i>
        <span slot="title">粉丝画像</span>
      </el-menu-item>
      <el-menu-item index="2-4">
        <i class="el-icon-menu"></i>
        <span slot="title">粉丝列表</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/account">
      <i class="el-icon-menu"></i>
      <span slot="title">账户信息</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'AppAside',
  data () {
    return {
      methods: {
        handleOpen (key, keyPath) {
          console.log(key, keyPath)
        },
        handleClose (key, keyPath) {
          console.log(key, keyPath)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
