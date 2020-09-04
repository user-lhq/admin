<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
      <div>
        <el-button type="success" @click="handlePublish(false)">发布</el-button>
        <el-button type="primary" @click="handlePublish(true)">存入草稿</el-button>
      </div>
    </div>
    <!-- 表单 -->
    <el-row>
      <el-col :span="16">
        <el-form ref="form" :model="articleForm" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="articleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <quill-editor
              ref="myQuillEditor"
              v-model="articleForm.content"
              :options="editorOption"
            />
          </el-form-item>
          <el-form-item label="封面">
            <!-- <el-radio-group v-model="publishForm.cover">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group> -->
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="articleForm.channel_id" clearable>
              <el-option
                v-for="item in channels"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
            <!-- <article-channel v-model="articleForm.channel_id"></article-channel> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 表单 -->
  </el-card>
</template>
<script>
// import ArticleChannel from '@/components/article-channel'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import '@/router/index.js'
export default {
  name: 'AppPublish',
  components: {
    // ArticleChannel,
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        cover: { // 封面
          type: 0, // 封面类型 -1：自动，0-无图，1-1张，3-3张
          images: [] // 封面图片
        },
        channel_id: '' // 频道
      },
      channels: [],
      editorOption: {} // 富文本编辑器配置选项
    }
  },
  created () {
    console.log(this.$router)
    if (this.$router.currentRoute.name === 'publish-edit') {
      this.loadArticle()
    }
    this.loadChannels()
  },
  methods: {
    async loadArticle () {
      console.log('hello')
      try {
        const data = await this.$http({
          method: 'GET',
          url: `/articles/${this.$router.currentRoute.params.id}`
        })
        console.log(data)
        this.articleForm = data
      } catch (err) {
        console.log(err)
        this.$message.error('获取文章失败了')
      }
    },
    async loadChannels () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/channels'
        })
        // console.log(data)
        this.channels = data.channels
      } catch (err) {
        // console.log(err)
        this.$message.error('获取频道数据失败')
      }
    },
    async handlePublish (draft) {
      console.log(123)
      try {
        if (this.$router.currentRoute.name === 'publish') {
          await this.$http({
            method: 'POST',
            url: '/articles',
            params: {
              draft
            },
            data: this.articleForm
          })
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        } else {
          await this.$http({
            method: 'PUT',
            url: `/articles/${this.$router.currentRoute.params.id}`,
            params: {
              draft
            },
            data: this.articleForm
          })
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
        // this.$router.push('/article')
      } catch (err) {
        this.$message.error('操作失败！', err)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .publish-card {
    // height: 100%;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
