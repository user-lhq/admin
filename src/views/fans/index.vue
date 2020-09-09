<template>
  <div>
    <!-- 画布容器 -->
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>
<script>
// 1. npm i echarts
// 2. 在哪里用就在哪里 import 引入
// 3. 在模板中准备一个具有宽高画布容器
// 4. 在 mounted 中初始化
import echarts from 'echarts'
export default {
  name: 'FansIndex',
  data () {
    return {}
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
    // myChart.setOption({
    //   series: [
    //     {
    //       name: '访问来源',
    //       type: 'pie',
    //       radius: '55%',
    //       data: [
    //         { value: 235, name: '视频广告' },
    //         { value: 274, name: '联盟广告' },
    //         { value: 310, name: '邮件营销' },
    //         { value: 335, name: '直接访问' },
    //         { value: 400, name: '搜索引擎' }
    //       ]
    //     }
    //   ]
    // })
  }
}
</script>
<style lang="less" scoped>

</style>
