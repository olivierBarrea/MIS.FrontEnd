<template>
  <div class="container pa0 flex justify-center m-3">
    <div class="card">
      <div class="container-fluid">
        <div class="row"></div>
        <h1 v-if="job.result == false" class="bg-danger text-white text-center">
          FAIL
        </h1>
        <h1 v-if="job.result == true" class="text-success text-center">PASS</h1>
        <div class="row">
          <div class="col-lg-4">
            <a v-bind:href="imagesUrl[0]" download target="_blank">
              <img v-bind:src="imagesUrl[0]" class="img-fluid rounded-start" />
            </a>
          </div>
          <div class="col-lg-1" />
          <div class="col-lg-7">
            <br />

            <span>Product uuid</span>
            <h4 class="text-right">{{ job.uuid }}</h4>
            <br />
            <span>TimeStamp</span>
            <h4>{{ job.timestamp }}</h4>
            <br />

            <table class="table table-bordered info-table">
              <thead>
                <tr>
                  <th class="th-lg">Name</th>
                  <th>Estimated Measurement</th>
                  <th>Nominal Minimum</th>
                  <th>Nominal Maximum</th>
                  <th>Unit</th>
                  <th>Result</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="measure in this.measurements"
                  :key="measure.algorithm"
                >
                  <td>{{ measure.name }}</td>
                  <td>
                    {{
                      Math.round(measure.estimated_measurement * 1000) / 1000
                    }}
                  </td>
                  <td>{{ measure.nominal_range.min_value }}</td>
                  <td>{{ measure.nominal_range.max_value }}</td>
                  <td>{{ measure.units }}</td>
                  <td>
                    <h5 v-if="measure.result == 'fail'" class="text-danger">
                      FAIL
                    </h5>

                    <h5 v-if="measure.result == 'pass'" class="text-success">
                      PASS
                    </h5>
                  </td>
                  <td>
                    {{ measure.confidence.value }}
                    {{
                      measure.confidence.units == "percent"
                        ? "%"
                        : measure.confidence.units
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//import ProductCard from "../components/ProductCard.vue";
import { createClient } from "graphql-ws";
import axios from "axios";

export default {
  name: "Live",
  components: {},
  props: {},

  data() {
    return {
      job: Object,
      image_uuids: [],
      imagesUrl: [],
      measurements: [],
    };
  },
  methods: {
    async GetLastJob() {
      console.log("Getting last job");
      await axios({
        method: "POST",
        url: "http://10.1.100.222:5080/v1/graphql",
        data: {
          query: `
                         {
                          deltaray_product(order_by: {timestamp: desc}, limit: 1, where: {timestamp: {_is_null: false}}){
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
        this.job = result.data.data.deltaray_product[0];
        this.measurements = [];

        for (let i = 0; i < this.job.fk_result_products.length; i++) {
          for (
            let j = 0;
            j < this.job.fk_result_products[i].measurements.length;
            j++
          ) {
            this.measurements.push(
              this.job.fk_result_products[i].measurements[j]
            );
          }
        }
        console.log(this.job);
      });
    },
    async getImage() {
      await axios({
        method: "POST",
        url: "http://10.1.100.222:5080/v1/graphql",
        data: {
          query:
            `{deltaray_result_image(where: {product_uuid: {_eq: "` +
            this.job.uuid +
            `"}}) { uuid } } `,
        },
      })
        .then(async (result) => {
          console.log(result);
          this.image_uuids = result.data.data.deltaray_result_image;
          console.log(this.image_uuids);
          //create image Url
          this.imagesUrl=[];
          for (const image_uuid of this.image_uuids) {
            this.imagesUrl.push(
              "http://10.1.100.222:3000/api/v1/result/image/" + image_uuid.uuid
            );
          }
        })
        .catch((err) => console.log(err));

      console.log(this.imagesUrl[0]);
    },
  },
  async created() {
    await this.GetLastJob();
    await this.getImage();

    await setInterval(async () => {
      await this.GetLastJob();
      await this.getImage();
    }, 5000);
  },
};
</script>

<style scoped>
.scrolling-wrapper-flexbox {
  flex-wrap: nowrap;
}
.card {
  height: 80%;
  flex-direction: row;
}
img {
  height: 80%;

  margin: 25px;
}
.container-fluid {
  margin: 15px;
}
</style>
