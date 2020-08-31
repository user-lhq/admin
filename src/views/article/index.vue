<template>
  <div>
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <el-form ref="form" :model="filterParams" label-width="80px">
          <el-form-item label="状态：">
            <el-radio-group v-model="filterParams.status">
              <el-radio label="">全部</el-radio>
              <el-radio
              v-for="(item, index) in statType"
              :key="item.label"
              :label="index">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道：">
            <el-select v-model="filterParams.channel_id" clearable>
              <el-option
                v-for="item in channels"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="range_date"
              @change="handleDateChange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>一共有<strong>{{ totalCount }}</strong>条数据</span>
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
        <template slot-scope="scope">
          <el-button type="primary" size="mini" plain round>修改</el-button>
          <el-button type="danger" size="mini" round plain @click="handleDelete(scope.row)">删除</el-button>
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
        :current-page="page"
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
      articleLoading: false, // 加载中
      filterParams: {
        status: '', // 文章状态
        channel_id: '', // 频道id
        begin_pubdate: '', // 开始时间
        end_pudate: '' // 结束时间
      },
      range_date: '', // 时间范围绑定值,这个字段的意义是为了绑定 date 组件出发 change 事件
      channels: [] // 所有频道
    }
  },
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  methods: {
    async handleDelete (item) {
      // console.log(item.id.toString())
      try {
        // 删除确认提示
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // .catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   })
        // })
        // 确认：执行删除操作
        await this.$http({
          method: 'DELETE',
          url: `/articles/${item.id}`
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 删除成功重新加载数据列表
        this.loadArticles()
      } catch (err) {
        // console.log(err)
        if (err === 'cancel') {
          return this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
        this.$message.error('删除文章失败')
      }
    },
    handleDateChange (value) {
      // console.log(value)
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pudate = value[1]
    },
    async loadChannels () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/channels'
        })
        console.log(data)
        this.channels = data.channels
      } catch (err) {
        console.log(err)
        this.$message.error('获取频道数据失败')
      }
    },
    handleFilter () {
      // 点击查询按钮，根据表单中的数据查询文章列表
      this.page = 1 // 查询从第一页数据
      this.loadArticles()
    },
    async loadArticles () {
      try {
        // 请求开始，加载loading
        this.articleLoading = true
        // 除了登录相关接口之外， 其他接口都必须在请求头中通过 Authorization 字段提供用户 token
        // 当我们登录成功，服务端会生成一个 token 令牌， 放到用户信息中
        // const token = getUser().token

        // 去除无用数据字段
        const filterData = {}
        for (const key in this.filterParams) {
          const item = this.filterParams[key]
          if (item !== null && item !== undefined && item !== '') {
            filterData[key] = item
          }
        }
        const data = await this.$http({
          method: 'GET',
          url: '/articles',
          // headers: { // 自定义请求头
          //   Authorization: `Bearer ${token}` // 后端要求：将 token 以 'Bearer token ' 的数据格式放到请求头的 Authorization 字段中
          // }
          params: {
            page: this.page, // 页码
            per_page: this.pageSize, // 每页大小
            ...filterData // 将 filterData 混入到当前 data 中
          }
        })
        this.articles = data.results
        this.totalCount = data.total_count
        // 请求结束，关闭loading
        this.articleLoading = false
      } catch (err) {
        this.$message.error('加载文章列表失败', err)
      }
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
