<template>
  <div class="card flex-fill">
    <div class="card-header">
      <h5 class="card-title mb-0">{{ title }}</h5>
    </div>
    <canvas ref="chart"></canvas>
  </div>
</template>


<script>
import Chart from "chart.js";

export default {
  name: "AnalyticChart",
  props: {
    chartData: Object,
    title: String,
  },
  
    

    mounted(){
      console.log(this.chartData);
      var ctx = this.$refs.chart.getContext('2d');
      new Chart(ctx, this.chartData);
    }
    
   
  
};
</script>