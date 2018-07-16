
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["c1.c1.r05", "c1.c1r1", "c1.c1r2", "c1.c1r4", "c1.c2r1", "c1.c2r2", "c1.c2r4", "c1.c2r8", "c1.c2r16", "c1.c4r2", "c1.c4r4", "c1.c4r8", "c1.c4r16", "c1.c4r32", "c1.c8r4", "c1.c8r8", "c1.c8r16", "c1.c8r32", "c1.c8r64", "c1.c16r8", "c1.c16r16", "c1.c16r32", "c1.c16r64", "c1.c16r96", "c1.c16r128", "c1.c16r256", "c1.c32r16", "c1.c32r32", "c1.c32r64", "c1.c32r96", "c1.c32r128", "c1.c32r256 (beta)", "c1.c64r256 (beta)"],
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
              label: "Amazon",
              backgroundColor: 'rgb(255, 128, 15)',
              borderColor: 'rgb(255, 128, 15)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [0.009, 0.019, 0.039, 0.079, 0.032, 0.052, 0.091, 0.170, 0.328, 0.077, 0.116, 0.195, 0.353, 0.669, 0.166, 0.245, 0.403, 0.719, 1.352, 0.345, 0.503, 0.819, 1.452, 2.084, 2.717, 5.247, 0.703, 1.019, 1.651, 2.284, 2.916, 5.446, 5.845],
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