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
        <el-button type="primary" @click="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import axios from 'axios'
import '@/vendor/gt'
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
    handleLogin () {
      // console.log('login')
      axios({
        method: 'post',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.form
      }).then(res => { // >=200 && < 400 的状态码会进入这里
        // console.log(res.data)
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      }).catch(e => { // >= 400 的状态码会进入这里
        this.$message.error('登陆失败，手机号或者验证码错误！')
      })
    },
    handleSendCode () {
      const { mobile } = this.form
      axios({
        method: 'get',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        // console.log(res.data)
        const { data } = res.data
        window.initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'
        }, function (captchaObj) {
          // 这里可以调用验证实例 captchaObj 的实例方法
          captchaObj.onReady(function () {
            // your code
            captchaObj.verify()
          }).onSuccess(function () {
            // your code
            // console.log(captchaObj.getValidate())
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate
            } = captchaObj.getValidate()
            axios({
              method: 'get',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            }).then(res => {
              console.log(res.data)
            })
          }).onError(function () {
            // your code
          })
        })
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
