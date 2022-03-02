<template>
  <div class="bg-white border rounded">
    <div ref="productCard" class="A4pdfPage container-fluid">
      <!--Logo>-->
      <div class="row">
        <div class="col-9"></div>
         
        <div class="col-1 float-end">
          <img class="pull-right" src="../assets/image/pollman.png" />
        </div>
      </div>
      <!--header-->
      <div class="row">
        <table class="table table-bordered info-table">
          <thead>
            <tr>
              <th>TimeStamp</th>
              <th>Serial Number</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ job.timestamp }}</td>
              <td>{{ job.serial_number }}</td>
               <h5 v-if="job.result == false"  class="text-danger">FAIL</h5>
               <h5 v-if="job.result == true"  class="text-success">PASS</h5>
            </tr>
          </tbody>
        </table>
      </div>
      <!--images-->
      <div class="row">
        <table class="table table-bordered defect-detection-table">
          <thead>
            <tr>
              <th>Defect Detection</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="row image-row">
      <div v-for="(imageUrl,i) in imagesUrl" :key="i" class="col">
     
          <figure>
            <a v-bind:href="imageUrl" download target="_blank">
              <img v-bind:src="imageUrl"  width="200" height="200" />
              <!-- <figcaption>caption</figcaption> -->
          </a>
          </figure>
        
      </div>
      </div>
      <br />

      <!--result-->
      <div class="row result-row">
        <table class="table table-bordered info-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Estimated Measurement</th>
              <th>Nominal Minimum</th>
              <th>Nominal Maximum</th>
              <th>Unit</th>
              <th>Result</th>
              <th>Confidence</th>             
            </tr>
          </thead>
          <tbody>
            <tr v-for="measure in this.measurements" :key="measure.algorithm">
             
              <td>{{measure.name}}</td>
              <td>{{measure.estimated_measurement}}</td>
              <td>{{measure.nominal_range.min_value}}</td>
              <td>{{measure.nominal_range.max_value}}</td>
              <td>{{measure.units}}</td>
                <td>

                  <h5 v-if="measure.result == 'fail'"  class="text-danger ">{{ measure.result }}</h5>

                  <h5 v-if="measure.result == 'pass'"  class="text-success">{{ measure.result }}</h5>
                </td>
              <td>{{ measure.confidence.value}} {{measure.confidence.units == 'percent'?'%':measure.confidence.units}}</td>
            </tr>
          
          </tbody>
        </table>
      </div>
      <!-- <span>
        * D1 and D2 are the estimated distances between Pin1 & Pin 2 and Pin 3 &
        Pin 4 respectively.
      </span> -->
      <br />
      <br />
      <br />
      <br />

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
            contact <a href="info@deltaray.eu">info@deltaray.eu </a> for more
            information. <br />

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
</template>


<script>
import jsPDF from "jspdf";
import axios from "axios";

export default {
  props: {
    job: Object,
    
  },
  data(){
    return{
    image_uuids:[],
    imagesUrl:[],
    measurements:[]
    }
  },

  methods: {
    generatePdf() {
      console.log(JSON.stringify(this.job));
      const doc = new jsPDF("p", "pt", "A4");

      doc.html(this.$refs.productCard, {
        html2canvas: {
          scale: 0.34,
        },

        callback: function (doc) {
          doc.save("DeltaRay Report.pdf");
        },
      });
    },
  },
  async created()
  {
    console.log("job selected:");

    console.log(this.job);

  //create a better measurement list
  for (let i = 0; i < this.job.fk_result_products.length; i++)
  {
      for (let j = 0; j < this.job.fk_result_products[i].measurements.length; j++)
      {
        this.measurements.push(this.job.fk_result_products[i].measurements[j])  ;     
      }   
  }
  console.log(this.measurements);


    //get images
    console.log("downloading images:");
    await axios({
          method: "POST",
          url: "http://10.1.100.222:5080/v1/graphql",
          data: {
            query: `{
                          deltaray_result_image(where: {product_uuid: {_eq: "`+ this.job.uuid +`"}}) {
                            uuid
                        }
                    }
                      `,
          },
        }).then(async (result) => {
          console.log(result);
          this.image_uuids = result.data.data.deltaray_result_image;
          console.log(this.image_uuids);
          //create image Url
          for(const image_uuid of this.image_uuids){
                this.imagesUrl.push("http://10.1.100.222:3000/api/v1/result/image/" + image_uuid.uuid);
          }

        }).catch(err => console.log(err));

      console.log(this.imagesUrl[0]);
  },
  computed() {
    return {
      final_label: "BAD",
    };
  },
};
</script>


<style scoped>
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
.A4pdfPage {
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