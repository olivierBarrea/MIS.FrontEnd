

import axios from "axios";

const getJobs =async()=>{
    try {
      return await axios({
        method: "POST",
        url: "http://10.1.100.222:5080/v1/graphql",
        data: {
          query: `
                          {
                            deltaray_result(order_by: {timestamp: desc}, limit: 100) {
                            data
                            product_label
                            product_uuid
                            timestamp
                            type
                            uuid
                          }
                          }
                      `,
        },
      });
      
    } catch (error) {
      console.error(error);
    }
}