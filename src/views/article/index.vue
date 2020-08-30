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
        <span>一共有<span :total="totalCount"></span>条数据</span>
      </div>
      <!--
        table 表格不需要我们自己去手动 v-for 遍历
        你只需要将数据数据交给 table 表格的 data 属性就可以了
        然后配置el-table-column 列
        label 列头标题
        prop 遍历项中的数据字段
        width 列宽
        表格默认把数据当做文本输出
        如果需要其他数据格式，则可以自定义表格列
       -->
      <el-table
      class="article-list"
      :data="articles"
      style="width: 100%"
      v-loading="articleLoading">
      <el-table-column
        prop="cover.images[0]"
        label="封面"
        width="180">
        <!--
          template 中的内容就是自定义表格列内容
          如果需要在 template 中访问遍历项数据，则需要给 template 配置 slot-scope="scope"
          slot-scope 属性名是固定的
          scope 值是自己随便起的名字
          结果就是： 我们可以通过 scope.row 访问到 当前遍历项对象，就好比我们遍历中的 item 一样
         -->
        <template slot-scope="scope">
          <img width="20px" v-for="item in scope.row.cover.images" :key="item" :src="item" alt="">
          <!-- <strong>{{ scope.row.title }}</strong> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态"
        width="180">
        <template slot-scope="scope">
          <!--
            status 0、1、2、3、4
            [
              {
                type: '0',
                label: '草稿'
              },
              {
                type: '1',
                label: '待审核'
              },
              {
                type: '2',
                label: '审核通过'
              },
              {
                type: '3',
                label: '审核失败'
              },
              {
                type: '4',
                label: '已删除'
              }
            ]
           -->
          <el-tag :type="statType[scope.row.status].type">{{ statType[scope.row.status].label }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
          <el-button type="primary" size="mini" plain round>修改</el-button>
          <el-button type="danger" size="mini" round plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <!--
        分页
        page-size 配置每页大小 默认10
        total 总条目数
        分页组件根据每页代销喝总条目数进行分页
       -->
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
        :disabled="articleLoading"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
// import { getUser } from '@/utils/auth'
export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [],
      statType: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      pageSize: 10, // 每页大小
      totalCount: 0, // 总数据量
      page: 1, // 当前页码
      articleLoading: false // 加载中
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    async loadArticles () {
      // 请求开始，加载loading
      this.articleLoading = true
      // 除了登录相关接口之外， 其他接口都必须在请求头中通过 Authorization 字段提供用户 token
      // 当我们登录成功，服务端会生成一个 token 令牌， 放到用户信息中
      // const token = getUser().token
      const data = await this.$http({
        method: 'GET',
        url: '/articles',
        // headers: { // 自定义请求头
        //   Authorization: `Bearer ${token}` // 后端要求：将 token 以 'Bearer token ' 的数据格式放到请求头的 Authorization 字段中
        // }
        params: {
          page: this.page, // 页码
          per_page: this.pageSize // 每页大小
        }
      })
      this.articles = data.results
      this.totalCount = data.total_count
      // 请求结束，关闭loading
      this.articleLoading = false
    },
    handleCurrentChange (page) {
      console.log(page)
      // 将数据中的页码修改为当前最新改变的数据页码
      this.page = page
      // 页码改变重新加载当前文章列表
      this.loadArticles()
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
