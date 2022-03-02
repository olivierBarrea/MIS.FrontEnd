<template>
  <div class="container-fluid main-container">
    <div class="row">
      <h1 class="h3 col-xl-3"><strong>Analytics</strong> Dashboard</h1>
      <div class="col-xl-3">
        <RangeDatePicker ref="datePicker" righttoleft="true" @selected="onDateRangeSelected" />
      </div>
    </div>
    <div class="row">
      <div class="bg-white border rounded">
        <div ref="pdfReport"  class="container-fluid A4PdfReport">
          <br />

          <!--Logo>-->
          <div class="row">
            <div class="col-6">
              <h3><strong>DeltaRay </strong>Inspection Report</h3>
            </div>
            <div class="col-3"></div>
            <div class="col-3">
              <img class="pull-right" src="../assets/image/pollman.png" />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <h3>
                From <strong> {{ DateRange.start }}</strong> To
                <strong> {{ DateRange.end }}</strong>
                <br />
              </h3>

              <h5>Total Production: {{ totalProduction }} units</h5>
              <h5>Fail Production: {{ badProductCount }} units</h5>
              <h5>Defect Rate: {{ defectProductRate }} %</h5>
              <br />
            </div>
          </div>
          <!--graphics-->
          <div class="row">
            <div class="card col-5 m-3">
              <h1 class="card-title">Total Production</h1>
              <div class="card-body">
                <canvas ref="PassFailchart"></canvas>
              </div>
            </div>
            <div class="card col-5 m-3">
              <h1 class="card-title">Defect Distribution</h1>
              <div class="card-body">
                <canvas ref="DefectDetailchart"></canvas>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="card col-11 m-3">
              <h1 class="card-title">Production Timeline</h1>
              <div class="card-body">
                <canvas ref="ProductionChart"></canvas>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
          <!--Footer-->
          <div class="row pdfFooter">
            <div class="col-3">
              <div class="confidential-text">
                <span> CONFIDENTIAL </span>
                <br />
                <span class="text-danger"> For internal use only </span>
              </div>
            </div>
            <div class="col-3 internal-use-only-text"></div>
            <div class="col-6 visitUs-text">
              <span>
                Please visit <a href="www.deltaray.eu">www.deltaray.eu</a> or
                contact <a href="info@deltaray.eu">info@deltaray.eu </a> for
                more information. <br />

                3DAX 1.0.0. Manufactured by DeltaRAY, Centrum Zuid 1111 3530
                Houthalen Helchteren Belgium.</span
              >
            </div>
          </div>
        </div>
          <div class="row">
            <div class="col text-center">
              <button class="btn btn-dark float-right" @click="generatePdf()">
                Export to PDF
              </button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
//import AnalyticCard from "../components/AnalyticCard.vue";
import AnalyticChart from "../components/AnalyticChart.vue";
import RangeDatePicker from "../components//datePicker/RangeDatePicker.vue";
import axios from "axios";
import barData from "../barData.js";
import pieData from "../pieData.js";
import Chart from "chart.js";
import fecha from 'fecha'
import jsPDF from "jspdf";

export default {
  name: "DashBoard",
  components: { RangeDatePicker },
  data() {
    return {
      jobs: [],
      ProductionChartData: barData,
      PieChartData: pieData,
      DefectPieData: {},
      DefectDetailPieData: {},
      ProductionData: {},
      DateRange: {},
      totalProduction: {},
      defectProductRate: {},
      badProductCount: {},
    };
  },

  methods: {
        generatePdf() {
      
      const doc = new jsPDF("p", "pt", "A4");

         

      doc.html(this.$refs.pdfReport, {
        html2canvas: {
          scale: 0.34,
        },

        callback: function (doc) {
          doc.save("DeltaRay Report.pdf");
        },
      });
    },
    async onDateRangeSelected(range) {
      console.log("new date selected");
      console.log(range.start);
      console.log(range.end);
      this.DateRange.start = range.start;
      this.DateRange.end = range.end;

      await axios({
        method: "POST",
        url: "http://10.1.100.222:5080/v1/graphql",
        data: {
          query:
            `
                                {
                                  deltaray_product(where: {timestamp: {_gte: "` +
            range.start +
            `", _lte: "` +
            range.end +
            `T23:59:59+00:00"}}, order_by: {timestamp: desc}) {
                                    uuid
                                      serial_number
                                      timestamp
                                      result
                                      fk_result_products {
                                      algorithm
                                      measurements
                                  }
                                }
                                }
                              `,
        },
      }).then((result) => {
        console.log("jobs receive in date range:");
        this.jobs = result.data.data.deltaray_product;
        console.log(this.jobs);

        this.totalProduction = this.jobs.length;
        this.badProductCount = this.jobs.filter(
          (x) => x.result === false
        ).length;
        this.defectProductRate = (
          (this.badProductCount / this.totalProduction) *
          100
        ).toFixed();

         Chart.plugins.register({
              beforeDraw: function(chartInstance) {
              var ctx = chartInstance.chart.ctx;
              ctx.fillStyle = "white";
              ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
              }
            });

        this.UpdatePassFailPie();
        this.UpdateDefectDetailPie();
        this.UpdateProductionChart();
      });
    },

    UpdatePassFailPie() {
      console.log("updating UpdatePssFailPie");
      this.DefectPieData = {
        type: "pie",
        data: {
          labels: ["PASS", "FAIL"],
          datasets: [
            {
              data: [
                this.jobs.filter((x) => x.result == true).length,
                this.jobs.filter((x) => x.result == false).length,
              ], //data: [4306, 3801, 1689],
              backgroundColor: ["#47B39C", "#EC6B56"],
              borderWidth: 5,
            },
          ],
        },
        options: {
          responsive: true,

          legend: {
            display: true,
          },
          cutoutPercentage: 75,
        },
      };
      console.log(this.DefectPieData);
      var ctx = this.$refs.PassFailchart.getContext("2d");
      new Chart(ctx, this.DefectPieData);
    },

    UpdateDefectDetailPie() {
      console.log("updating UpdatedefectdetailPie");

      let measurementList = new Array();
      let defectNameList = new Array();
      let defectValueList = new Array();

      for (let i = 0; i < this.jobs.length; i++) {
        for (let j = 0; j < this.jobs[i].fk_result_products.length; j++) {
          for (
            let k = 0;
            k < this.jobs[i].fk_result_products[j].measurements.length;
            k++
          ) {
            measurementList.push(
              this.jobs[i].fk_result_products[j].measurements[k]
            );
          }
        }
      }

      console.log(measurementList);

      for (let i = 0; i < measurementList.length; i++) {
        if (!defectNameList.includes(measurementList[i].name)) {
          let pos = defectNameList.push(measurementList[i].name);
          defectValueList[pos - 1] = 0;
        }

        if (measurementList[i].result === "fail") {
          let index = defectNameList.indexOf(measurementList[i].name);
          defectValueList[index] = defectValueList[index] + 1;
        }
      }

      console.log(defectValueList);
      console.log(defectNameList);

      this.DefectDetailPieData = {
        type: "pie",
        data: {
          labels: defectNameList,
          datasets: [
            {
              data: defectValueList,
              backgroundColor: [
                "#003f5c",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#ffa600",
              ],
              borderWidth: 5,
            },
          ],
        },
        options: {
          responsive: true,

          legend: {
            display: true,
          },
          cutoutPercentage: 75,
        },
      };
      console.log(this.DefectDetailPieData);
      var ctx = this.$refs.DefectDetailchart.getContext("2d");
      new Chart(ctx, this.DefectDetailPieData);
    },

    UpdateProductionChart() {
      //group good and bad job/day
      let dates= new Array();
      let goodJobCount= new Array();
      let badJobCount= new Array();

      

      for (let i = 0; i < this.jobs.length; i++) {
          let date = this.jobs[i].timestamp.substring(0,10);
          //add date if not exist
          if(!dates.includes(date)){
            dates.push(date);
            goodJobCount.push(0);
            badJobCount.push(0);
          }
          //find index of date
          let index = dates.indexOf(date);

          if(this.jobs[i].result===false){
            badJobCount[index]=badJobCount[index]+1;
          }else{
            goodJobCount[index]=goodJobCount[index]+1;
          }
      }

      dates=dates.reverse();
      goodJobCount=goodJobCount.reverse();
      badJobCount=badJobCount.reverse();
      console.log(dates);
      console.log(goodJobCount);
      console.log(badJobCount);

      this.ProductionData = {
        type: "bar",
        data: {
          labels:dates,
          datasets: [
            {
              label: "Fail",
              data: badJobCount,
              backgroundColor: "rgba(250, 96, 65)",
              borderColor: "#eb2b05",
              borderWidth: 3,
            },
            {
              label: "Pass",
              data: goodJobCount,
              backgroundColor: "rgba(71, 183,132,.5)",
              borderColor: "#47b784",
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      };
      console.log(this.ProductionData);
      var ctx = this.$refs.ProductionChart.getContext("2d");
      new Chart(ctx, this.ProductionData);
    },
    
  },
   created() {
    let dateparse = new Date();   
    let start= fecha.format(new Date(Date.UTC(dateparse.getFullYear(), dateparse.getMonth(), dateparse.getDate()-6)), 'YYYY-MM-DD');
    let end= fecha.format(new Date(Date.UTC(dateparse.getFullYear(), dateparse.getMonth(), dateparse.getDate()+1)), 'YYYY-MM-DD');
             

     this.onDateRangeSelected({start,end});
      
    
  },
  
};
</script>



<style scoped>
.Card {
  margin: 10px;
}
.image-row img {
  height: 250px;
}
.logo-image {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.pdfFooter {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.visitUs-text {
  display: flex;
  justify-content: right;
  text-align: right;
}
.internal-use-only-text {
  color: #fa6a5a;
  font-weight: bold;
}

.confidential-text {
  font-weight: bold;
}
.A4PdfReport {
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  position: relative;
  margin: 20mm;
  width: 420mm;
  padding: 20px;
}

.final-result-cell {
  text-align: center;
  background: #fa6a5a;
}

.defect-detection-table {
  text-align: center;
}
thead {
  border-bottom-style: solid;
  border-bottom-color: lightgray;
  border-bottom-width: 2px;
  background: lightgray;
}

.container-fluid {
  padding: 30px;
}
.row {
  margin-bottom: 10px;
}

button {
  max-width: 600px;
  margin: 20px;
}
</style>

