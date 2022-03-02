<template>
  <div class="main-container">
    <div class="row">
      <div class="card ">
        <div class="row">
          <h2 class="col-4">Product history</h2>
          <div class="col-3"><RangeDatePicker   righttoleft="true" @selected="onDateRangeSelected"  /></div>
          <div class="col-3">
            <input type="text" placeholder="product ID" @change.prevent="onInputChange" v-model="product_id_search" />
          </div>
          <div class="col-2" >
            <button @click="download()"><img src="../assets/icon/download.svg">Download</button>
          </div>
        </div>
 <div class="row">
        <table ref="jobTable" class="table table-hover table-striped">
          <thead></thead>
          <thead>
            <tr>
              <th>Time stamp</th>
             
              <th>Serial Number</th>
              <th>product ID</th>
              <th>Result</th>
              
            </tr>
          </thead>
          <tbody>
            <template v-for="job in jobs" :key="job.uuid">
              <tr @click="onRowClick(job.uuid)">
                <td>{{ job.timestamp }}</td>
 

                <td>{{ job.serial_number }}</td>
                <td>{{ job.uuid }}</td>

                 
                <td>
                  <span class="label  label-danger " v-if="job.result == false" >
                            <strong class="text-danger ">FAIL</strong>
                  </span>
                  <span class="label  label-success " v-if="job.result == true" >
                            <strong class="text-success ">PASS</strong>
                  </span>
                  
                </td>
              <!-- <td>{{ job.product_rating_confidence_value}} {{job.product_rating_confidence_units == 'percent'?'%':job.product_rating_confidence_units}}</td> -->
              </tr>

              <tr v-if="opened.includes(job.uuid)">
                <td colspan="5">
                  <div>
                    <Job :job="job" class="job" col-10></Job>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Job from "../components/Job.vue";
import RangeDatePicker from "../components//datePicker/RangeDatePicker.vue";
import axios from "axios";

export default {
  components: { Job, RangeDatePicker },
  name: "ProductHistory",
  inheritAttrs: false,

  data() {
    return {
      results: [],
      jobs: [],
      opened: [],
      product_id_search :"",
       
    };
  },

  methods: {
    async onInputChange() {
      console.log("click")
      if(this.product_id_search == "") return;
      const formatStart ="00000000-0000-0000-0000-000000000000"
      const formatEnd =  "ffffffff-ffff-ffff-ffff-ffffffffffff"

      const length = this.product_id_search.length;
      const searchStringStart =this.product_id_search + formatStart.substring(length)
      const searchStringEnd =this.product_id_search + formatEnd.substring(length)

      console.log(searchStringStart)
      console.log(searchStringEnd)


        return await axios({
          method: "POST",
          url: "http://10.1.100.222:5080/v1/graphql",
          data: {
            query: `
                              {
                                deltaray_product(where: {uuid: {_gte: "`+ searchStringStart+`",_lte:"`+searchStringEnd+`"}}, order_by: {timestamp: desc}){
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
          this.jobs = result.data.data.deltaray_product ;
          console.log(this.jobs);
          })
        
    },
    async onDateRangeSelected(range){
      console.log("new date selected");
      console.log(range.start);
      console.log(range.end);

      await axios({
          method: "POST",
          url: "http://10.1.100.222:5080/v1/graphql",
          data: {
            query: `
                         {
                          deltaray_product(where: {timestamp: {_gte: "`+ range.start +`", _lte: "`+range.end+`T23:59:59+00:00"}}, order_by: {timestamp: desc}) {
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
          console.log(result);
          this.jobs = result.data.data.deltaray_product ;
          console.log(this.jobs);

          })


    },

    async onSearch(){
      console.log("search by productID");
      console.log(this.product_id_search);
      await axios({
          method: "POST",
          url: "http://10.1.100.222:5080/v1/graphql",
          data: {
            query: `
                         {
                          deltaray_product(order_by: {timestamp: desc}, limit: 100, where: {timestamp: {_is_null: false}}){
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
 
          
          this.jobs = result.data.data.deltaray_product ;
          console.log(this.jobs);
         
          })
    },

    onRowClick(uuid) {
      console.log("uuid click :" + uuid);
      const index = this.opened.indexOf(uuid);
      console.log("index:" + index);
      //get image

      //open or close details
      if (index == -1) {
        //open
        console.log("push");
        this.opened.push(uuid);
      } else {
        // close
        console.log("slice");
        this.opened.splice(index, 1);
      }
    },

    download(){
    console.log("downloading");

    var rows = this.$refs.jobTable.rows;
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
            data = data.replace(/"/g, '""');
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(";"));
    }
    var csv_string = csv.join('\n');
    // Download it
    var filename = 'export_' + '_' + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
  },

  created() {
    this.onSearch();
  },

  computed: {
    columns: function columns() {
      if (this.jobs.length == 0) {
        return [];
      }
      return Object.keys(this.jobs[0]);
    },
  },
};
</script>

<style scoped>
.job {
  inline-size: inherit;
}
.main-container {
  margin: 2%;
}

table{
  padding: 0px;
  font-size: 12;
}
tr{
  height: 12px;
}

tr:hover {
  background-color: #bed8e9;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.row {
  margin-top: 20px;
  
}

.opened {
  background-color: yellow;
}
</style>