<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">日记统计</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div ref="locationChartRef" class="h-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg"></div>
      <div ref="yearChartRef" class="h-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const locationChartRef = ref(null)
const yearChartRef = ref(null)

onMounted(() => {
  const locationChart = echarts.init(locationChartRef.value)
  const yearChart = echarts.init(yearChartRef.value)

  // 地区分布图表
  locationChart.setOption({
    title: { text: '日记地区分布' },
    tooltip: {},
    series: [{
      name: '日记数量',
      type: 'pie',
      data: [
        { value: 30, name: '北京' },
        { value: 25, name: '上海' },
        { value: 20, name: '广州' },
        { value: 15, name: '深圳' },
        { value: 10, name: '其他' }
      ]
    }]
  })

  // 年份分布图表
  yearChart.setOption({
    title: { text: '日记年份分布' },
    tooltip: {},
    xAxis: { type: 'category', data: ['2019', '2020', '2021', '2022', '2023'] },
    yAxis: { type: 'value' },
    series: [{
      name: '日记数量',
      type: 'bar',
      data: [12, 19, 30, 25, 20]
    }]
  })
})
</script>