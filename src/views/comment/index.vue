<template>
  <el-card class="box-card">
    <div slot="header">
      <span>评论管理</span>
    </div>
    <el-table :data="articles">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="评论粉丝数"></el-table-column>
      <el-table-column label="允许评论">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.disabled"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  name: 'ArticleComment',
  data () {
    return {
      articles: [],
      results: [
        {
          id: 1,
          title: '争先恐后',
          total_comment_count: 0,
          fans_comment_count: 0,
          comment_status: true
        },
        {
          id: 2,
          title: '四是四十是十',
          total_comment_count: 0,
          fans_comment_count: 0,
          comment_status: true
        }
      ],
      article_id: '',
      allow_comment: ''
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    async loadArticles () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/articles',
          params: {
            response_type: 'comment'
          }
        })
        this.results.forEach(item => {
          item.disabled = false
        })
        this.articles = this.results
        console.log(data)
      } catch (err) {
        console.log(err)
        this.$message.error('加载文章列表失败')
      }
    },
    async handleChangeStatus (item) {
      console.log(item)
      try {
        // 禁用当前行的 switch 开关
        item.disabled = true
        // await this.$http({
        //   method: 'PUT',
        //   url: '/comment/status',
        //   params: {
        //     article_id: item.id.toString() // 注意：数据id转为字符串
        //   },
        //   data: {
        //     allow_comment: item.comment_status
        //   }
        // })
        this.article_id = item.id.toString()
        this.allow_comment = item.comment_status
        this.$message({
          type: 'success',
          message: `${item.comment_status ? '启用' : '禁用'}评论状态成功`
        })
      } catch (err) {
        console.log(err)
        this.$message.error('修改评论状态失败')
        // 评论状态修改失败，让客户端评论状态回到原来状态
        item.comment_status = !item.comment_status
      }
      // 启动当前行 switch 的点击状态
      item.disabled = false
    }
  }
}
</script>
<style lang="less" scoped>
.box-card {
  height: 100%;
}
</style>
