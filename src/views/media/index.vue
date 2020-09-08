<template>
  <el-card>
    <div slot="header">
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="active">
        <el-radio-button label="全部" @click.native="loadImages(false)"></el-radio-button>
        <el-radio-button label="收藏" @click.native="loadImages(true)"></el-radio-button>
      </el-radio-group>
      <!--
        这里我们可以直接使用upload 上传组件进行图片上传
        upload 组件支持自动请求，不用我们自己写代码，只需要配置一下请求接口
        如果要使用它默认的请求能力，就无法使用我们在axios 中做的那些配置了，例如 baseURL,请求拦截器
        1. action 请求地址
        2.headers 请求头
        3.name 字段名称
        :on-success="loadImages" 不行
          将 loadImages 配置为 on-success 的成功调用函数
          那么当上传成功的时候，upload 组件就会调用 loadImage(response, file, fileList)
          我们自己写的 loadImages 函数，期望参数是一个布尔值
       -->
      <el-upload
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="{ Authorization: `Bearer ${$store.state.user.token}` }"
        name="image"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <el-row :gutter="20">
      <el-col style="margin-bottom: 10px" :span="4" v-for="item in images" :key="item.id" >
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.url" class="image" sytle="max-width: 100%">
          <div style="padding: 10px;">
            <div class="bottom clearfix">
              <div class="bottn clearfix">
                <el-button
                  circle
                  type="primary"
                  :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'" plain
                  @click="handleCollect(item)"></el-button>
                  <!--
                    1.注册点击事件,绑定处理函数，传递要删除的数据对象
                    2.定义删除函数，发请求执行删除操作
                    3.成功：提示成功
                      失败：提示失败
                   -->
                <el-button @click="handleDelete(item)" circle type="primary" icon="el-icon-delete" plain></el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: 'MediaList',
  data () {
    return {
      active: '',
      images: []
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    async handleDelete (item) {
      try {
        await this.$http({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.loadImages()
      } catch (err) {
        this.$message.error('删除失败')
      }
    },
    async loadImages (collect = false) {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/user/images',
          params: {
            collect, // 是否查询收藏图片，默认查询所有
            page: 1,
            per_page: 10
          }
        })
        // console.log(data)
        this.images = data.results
      } catch (err) {
        console.log(err)
        this.$message.error('加载图片列表失败')
      }
    },

    async handleCollect (item) {
      const collect = !item.is_collected
      try {
        const data = await this.$http({
          method: 'PUT',
          url: `/user/images/${item.id}`,
          data: {
            collect
          }
        })
        // console.log(data)
        item.is_collected = data.collect
        this.$message({
          type: 'success',
          message: `${collect ? '' : '取消'}收藏成功`
        })
      } catch (err) {
        console.logO(err)
        this.$message.error('收藏失败')
      }
    },
    handleUploadSuccess () {
      this.loadImages()
    }
  }
}
</script>
<style lang="less" scoped>
  .action {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .botton {
    display: flex;
    justify-content: center;
  }
  .el-card__body {
    img {
      width: 100%;
      height: 180px;
    }
  }
</style>
