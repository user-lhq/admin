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
      <el-col :span="10">
        <el-form ref="form" :model="publishForm" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="publishForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="publishForm.content"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <!-- <el-radio-group v-model="publishForm.cover">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group> -->
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="publishForm.channel_id" placeholder="请选择活动区域">
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 表单 -->
  </el-card>
</template>
<script>
export default {
  name: 'AppPublish',
  data () {
    return {
      publishForm: {
        title: '', // 标题
        content: '', // 内容
        cover: { // 封面
          type: 0, // 封面类型 -1：自动，0-无图，1-1张，3-3张
          images: [] // 封面图片
        },
        channel_id: 3 // 频道
      }
    }
  },
  methods: {
    async handlePublish (draft) {
      console.log(123)
      try {
        await this.$http({
          method: 'POST',
          url: '/articles',
          params: {
            draft
          },
          data: this.publishForm
        })
        this.$message({
          type: 'success',
          message: '发布成功'
        })
      } catch (err) {
        this.$message.error('发布失败！', err)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .publish-card {
    height: 100%;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
