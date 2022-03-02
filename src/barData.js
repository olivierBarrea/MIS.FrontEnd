export const barData = {
    type: "bar",
    data: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
          label: "bad",
          data: [110, 210, 111, 142, 79, 82, 127, 114],
          backgroundColor: "rgba(250, 96, 65)",
          borderColor: "#eb2b05",
          borderWidth: 3
        },
        {
          label: "good",
          data: [1166, 2081, 3003, 1323, 1954, 2886, 2662],
          backgroundColor: "rgba(71, 183,132,.5)",
          borderColor: "#47b784",
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  };
  
  export default barData;