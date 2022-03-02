export const pieData = {
    type: "pie",
    data: {
        labels: ["Good", "Too Much", "Too less"],
        datasets: [{
            data: [4306, 3801, 1689],
            backgroundColor: [
                "#47B39C",
                "#EC6B56",
                "#FFC154",
                
            ],
            borderWidth: 5
        }]
    },
    options: {
        responsive: true,
        
        legend: {
            display: true
        },
        cutoutPercentage: 75
    }
};



export default pieData;
