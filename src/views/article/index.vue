<template>
  <div>
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>一共有xxxx条数据</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-table
      class="article-list"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
    </el-card>
  </div>
</template>
<script>
import { getUser } from '@/utils/auth'
export default {
  name: 'ArticleList',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    async loadArticles () {
      // 除了登录相关接口之外， 其他接口都必须在请求头中通过 Authorization 字段提供用户 token
      // 当我们登录成功，服务端会生成一个 token 令牌， 放到用户信息中
      const token = getUser().token
      const res = await this.$http({
        method: 'GET',
        url: '/articles',
        headers: { // 自定义请求头
          Authorization: `Bearer ${token}` // 后端要求：将 token 以 'Bearer token ' 的数据格式放到请求头的 Authorization 字段中
        }
      })
      console.log(res.data)
    }
  }
}
</script>
<style lang="less" scoped>
.filter-card {
  margin-bottom: 15px;
}
.article-list {
  margin-bottom: 30px;
}
</style>
