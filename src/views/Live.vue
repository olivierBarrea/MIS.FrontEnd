<template>
  <div class="container pa0 flex justify-center">
    <div class="row">
      <h1> </h1>
      <div class="card mb-8" style="max-width: 1200px;">
        <div class="row g-0">
          <div class="col-md-4">
            <a v-bind:href="imagesUrl[0]" download target="_blank">
                <img v-bind:src="imagesUrl[0]" class="img-fluid rounded-start"  />
            </a>
          </div>
        <div class="col-md-8">
          <div class="card-body">
            
            <h1 v-if="job.product_rating == 'fail'"  class="bg-danger text-white text-center">FAIL</h1>
            <h1 v-if="job.product_rating == 'pass'"  class="text-success text-center">PASS</h1>  
            <h5 class="card-title">{{job.product_uuid}}</h5>       
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>


<script>
//import ProductCard from "../components/ProductCard.vue";
import { createClient } from 'graphql-ws';
import axios from "axios";

export default {
  name: "Live",
  components: {  },
  props: {},
  methods: {},  

  data(){
    return{
      job : Object,
      image_uuids:[],
      imagesUrl:[]
    }
  },
  async created(){
    const client = createClient({
    url: 'ws://10.1.100.222:5080/v1/graphql',
    });
      // query
      (async () => {
        const result = await new Promise((resolve, reject) => {
          client.subscribe(
            {
              query: `{ 
                          deltaray_result(order_by: {timestamp: desc}, limit: 1) {
                            measurements
                            product_rating
                            product_uuid
                            timestamp
                            algorithm
                            uuid
                            product_rating_confidence_units
                            product_rating_confidence_value
                        } }`,
            },
            {
              next: (data) => 
              {
                this.job = data.data.deltaray_result[0],
                console.log("getting last result")
                console.log(this.job)
                axios({
                      method: "POST",
                      url: "http://10.1.100.222:5080/v1/graphql",
                      data: {
                        query: `{
                                      deltaray_result_image(where: {result_uuid: {_eq: "`+ this.job.uuid+`"}}) {
                                        uuid
                                    }
                                }
                                  `,
                      },
                    }).then(async (result) => {
                              this.image_uuids = result.data.data.deltaray_result_image;
                              console.log(this.image_uuids);
                              //create image Url
                              for(const image_uuid of this.image_uuids){
                                    this.imagesUrl.push("http://10.1.100.222:3000/api/v1/result/image/" + image_uuid.uuid);
                              }

                            }).catch(err => console.log(err));

                        console.log(this.imagesUrl[0]);
                        },
                        error: reject,
                        complete: () => resolve(result),
                        
                      },
                    );
        });
      })();


  }


}
</script>

<style scoped>
    .scrolling-wrapper-flexbox {
      
      flex-wrap: nowrap;
      
    }
    .card {
       height: 100%;
      flex-direction: row;
      margin: 5px;
    }
    img{
      
      height: 90%;

      margin: 25px;
    }
    .container-fluid{
      margin: 15px;
    }
</style>
