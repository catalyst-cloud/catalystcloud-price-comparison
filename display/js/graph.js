
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["1 vCPUs, 0.5 GB RAM", "1 vCPUs, 1 GB RAM", "1 vCPUs, 2 GB RAM", "1 vCPUs, 4 GB RAM", "2 vCPUs, 1 GB RAM", "2 vCPUs, 2 GB RAM", "2 vCPUs, 4 GB RAM", "2 vCPUs, 8 GB RAM", "2 vCPUs, 16 GB RAM", "4 vCPUs, 2 GB RAM", "4 vCPUs, 4 GB RAM", "4 vCPUs, 8 GB RAM", "4 vCPUs, 16 GB RAM", "4 vCPUs, 32 GB RAM", "8 vCPUs, 4 GB RAM", "8 vCPUs, 8 GB RAM", "8 vCPUs, 16 GB RAM", "8 vCPUs, 32 GB RAM", "8 vCPUs, 64 GB RAM", "16 vCPUs, 8 GB RAM", "16 vCPUs, 16 GB RAM", "16 vCPUs, 32 GB RAM", "16 vCPUs, 64 GB RAM", "16 vCPUs, 96 GB RAM", "16 vCPUs, 128 GB RAM", "16 vCPUs, 256 GB RAM", "32 vCPUs, 16 GB RAM", "32 vCPUs, 32 GB RAM", "32 vCPUs, 64 GB RAM", "32 vCPUs, 96 GB RAM", "32 vCPUs, 128 GB RAM", "32 vCPUs, 256 GB RAM", "64 vCPUs, 256 GB RAM"],
        datasets: [
          {
              label: "Catalyst",
              backgroundColor: 'rgb(45, 160, 45)',
              borderColor: 'rgb(45, 160, 45)',
              pointRadius: 0,
              borderWidth: 5,
              tension: 0,
              fill: false,
              data: [0.023, 0.044, 0.062, 0.098, 0.070, 0.088, 0.124, 0.196, 0.339, 0.140, 0.176, 0.248, 0.391, 0.678, 0.280, 0.352, 0.496, 0.783, 1.112, 0.566, 0.711, 1.001, 1.352, 1.599, 1.845, 3.176, 1.057, 1.260, 1.586, 1.816, 2.191, 3.688, 4.381],
          },
          {
              label: "Google",
              backgroundColor: 'rgb(214, 39, 40)',
              borderColor: 'rgb(214, 39, 40)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [0.013, 0.021, 0.038, 0.072, 0.026, 0.043, 0.076, 0.143, 0.278, 0.051, 0.085, 0.152, 0.286, 0.555, 0.103, 0.170, 0.304, 0.573, 1.110, 0.206, 0.340, 0.609, 1.146, 1.683, 2.220, 4.368, 0.412, 0.680, 1.217, 1.755, 2.292, 4.440, 4.583],
          },
          {
              label: "AWS",
              backgroundColor: 'rgb(255, 128, 15)',
              borderColor: 'rgb(255, 128, 15)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [0.009, 0.019, 0.039, 0.078, 0.032, 0.051, 0.091, 0.169, 0.327, 0.076, 0.116, 0.194, 0.352, 0.667, 0.165, 0.244, 0.401, 0.716, 1.346, 0.343, 0.501, 0.816, 1.446, 2.076, 2.705, 5.225, 0.700, 1.015, 1.644, 2.274, 2.904, 5.424, 5.821],
          },
          {
              label: "Azure",
              backgroundColor: 'rgb(31, 119, 180)',
              borderColor: 'rgb(31, 119, 180)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [0.092, 0.094, 0.096, 0.101, 0.162, 0.165, 0.170, 0.180, 0.200, 0.301, 0.306, 0.316, 0.337, 0.377, 0.579, 0.589, 0.610, 0.650, 0.731, 1.136, 1.156, 1.197, 1.278, 1.359, 1.440, 1.764, 2.248, 2.289, 2.370, 2.451, 2.532, 2.857, 5.042],
          }
        ]
    },

    // Configuration options go here
    options: {
      responsive: true,
      title:{
          display:true,
          text:'Comparison of cloud compute price per hour',
          fontSize: 22
      },
      legend: {
        position: 'right',
        labels: {
          fontSize: 16,
          padding: 15
        }
      },
      tooltips: {
          mode: 'index',
          intersect: false,
          bodySpacing: 5
      },
      hover: {
          mode: 'nearest',
          intersect: true
      },
      scales: {
          xAxes: [{
              display: true,
              gridLines: {
                display: false
              },
              scaleLabel: {
                  display: true,
                  labelString: 'Instance flavor',
                  fontSize: 18
              }
          }],
          yAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Price/hour (NZD)',
                  fontSize: 18
              },

              ticks: {
                    callback: function(value, index, values) {return '$' + value;}
                }
          }]
      }
  }
});