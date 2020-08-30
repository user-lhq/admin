<template>
<div class="login">
  <el-form :model="form"  ref="form" class="login-form" :rules="rules">
    <el-form-item prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号" clearable></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <!-- el-col 栅格布局， :span用来指定占用的大小 一共24列 :offset 用来指定偏移量-->
      <el-col :span="14">
        <el-input v-model="form.code" placeholder="请输入验证码" clearable></el-input>
      </el-col>
      <el-col :offset="1" :span="9">
        <!-- <el-button type="success" @click="handleSendCode">获取验证码</el-button> -->
        <el-button type="success" @click="handleSendCode" :disabled="!!codeTimer" :loading="codeLoading">{{ codeTimer ? `剩余${codeTimeSeconds
          }秒` : '获取验证码'}}</el-button>
      </el-col>
    </el-form-item>
    <el-form-item prop="agree">
      <el-checkbox class="agree-checkbox" v-model="form.agree"></el-checkbox>
      <span class="agree-text">我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条例</a></span>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="handleLogin" :loading="loginLoading">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import '@/vendor/gt'
import { saveUser } from '@/utils/auth'
import initGeetest from '@/utils/init.geetest'
const initCodeTimerSeconds = 60
export default {
  name: 'AppLogin',
  data () {
    return {
      form: { // 表单数据对象
        mobile: '',
        code: '',
        agree: ''
      },
      rules: { // 验证规则
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '长度必须在11位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度必须在6位', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意网站协议' },
          { pattern: /true/, message: '请同意网站协议' }
        ]
      },
      codeTimer: null, // 倒计时定时器
      codeTimeSeconds: initCodeTimerSeconds, // 倒计时时间
      loginLoading: false,
      codeLoading: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        // 表单验证通过，提交登录请求
        this.submitLogin()
      })
    },
    async submitLogin () {
      // 登录前
      this.loginLoading = true
      try {
        const userInfo = await this.$http({
          method: 'post',
          url: '/authorizations',
          data: this.form
        })
        // const userInfo = res.data.data
        // window.localStorage.setItem('user_info', JSON.stringify(userInfo))
        saveUser(userInfo)
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        this.$message.error('登陆失败，手机号或者验证码错误！')
      }
      // 登录后
      this.loginLoading = false
    },
    handleSendCode () {
      // 验证手机号是否有效
      this.$refs.form.validateField('mobile', errorMessage => {
        // console.log(errorMessage)
        if (errorMessage.trim().length > 0) {
          return
        }
        // 验证通过，初始化显示验证码
        this.showGeetest()
      })
    },
    // 验证通过，初始化显示人机交互验证码
    async showGeetest () {
      try {
        this.codeLoading = true
        const { mobile } = this.form
        const data = await this.$http({
          method: 'get',
          url: `/captchas/${mobile}`
        })
        // const { data } = res.data
        const captchaObj = await initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'
        })
        // 这里可以调用验证实例 captchaObj 的实例方法
        captchaObj.onReady(() => {
          // your code
          this.codeLoading = false
          captchaObj.verify()
        }).onSuccess(async () => {
          // your code
          // console.log(captchaObj.getValidate())
          try {
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate
            } = captchaObj.getValidate()
            await this.$http({
              method: 'get',
              url: `/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            })
            // 发送短信成功，开始倒计时
            this.codeCountDown()
          } catch (err) {
            this.$message.error('获取验证码失败')
            this.codeLoading = false
          }
        })
      } catch (err) {
        this.$message.error('获取验证码失败')
        this.codeLoading = false
      }
    },
    // 验证码倒计时
    codeCountDown () {
      this.codeTimer = window.setInterval(() => {
        this.codeTimeSeconds--
        if (this.codeTimeSeconds <= 0) {
          // 清楚定时器
          window.clearInterval(this.codeTimer)
          // 让倒计时的时间回归初始状态
          this.codeTimeSeconds = initCodeTimerSeconds
          this.codeTimer = null // 将储存定时器引用的变量重新赋值为null
        }
      }, 1000)
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
  .login-form {
    padding: 10px;
    background: greenyellow;
    border-radius: 10px;
    width: 300px;
  }
  .el-button--primary {
    width: 100%;
  }
}
</style>
