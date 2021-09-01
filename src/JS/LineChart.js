import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.data, {
      borderWidth: "100px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "100px"
    });
  },
  // If you want to pass options please create a local options object
  watch: {
    chartData () {
        this.$data._chart.update()
    }
}
}