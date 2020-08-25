import '@/vendor/gt'
export default function (options) {
  return new Promise((resolve) => {
    window.initGeetest(options, captchaObj => {
      resolve(captchaObj)
    })
  })
}
