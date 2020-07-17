<template>
<div class="login">
  <el-form :model="form"  ref="form" class="login-form">
    <el-form-item>
        <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item>
      <!-- el-col 栅格布局， :span用来指定占用的大小 一共24列 :offset 用来指定偏移量-->
      <el-col :span="14">
        <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
      </el-col>
      <el-col :offset="1" :span="9">
        <el-button type="success" @click="handleSendCode">获取验证码</el-button>
      </el-col>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    submitForm () {
      console.log('login')
    },
    handleSendCode () {
      const { mobile } = this.form
      axios({
        method: 'get',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #e1f0ff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
