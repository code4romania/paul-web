const ChartTypes = {
  Bar: 'Bar',
  Line: 'Line',
  Pie: 'Pie'
}

const ChartConfig = {
  getChartTypes() {
    return ChartTypes
  },
  getComponent(type) {
    return ChartTypes[type] ? 'Chart' + ChartTypes[type] : 'ChartBar'
  }
}

export default ChartConfig
