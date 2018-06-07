
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["c1.c1.r05", "c1.c1r1", "c1.c1r2", "c1.c1r4", "c1.c2r1", "c1.c2r2", "c1.c2r4", "c1.c2r8", "c1.c2r16", "c1.c4r2", "c1.c4r4", "c1.c4r8", "c1.c4r16", "c1.c4r32", "c1.c8r4", "c1.c8r8", "c1.c8r16", "c1.c8r32", "c1.c8r64", "c1.c16r8", "c1.c16r16", "c1.c16r32", "c1.c16r64", "c1.c16r96", "c1.c16r128", "c1.c16r256", "c1.c32r16", "c1.c32r32", "c1.c32r64", "c1.c32r96", "c1.c32r128"],
        datasets: [
          {
              label: "Catalyst",
              backgroundColor: 'rgb(45, 160, 45)',
              borderColor: 'rgb(45, 160, 45)',
              pointRadius: 0,
              borderWidth: 5,
              tension: 0,
              fill: false,
              data: [0.030, 0.044, 0.062, 0.098, 0.070, 0.088, 0.124, 0.196, 0.339, 0.140, 0.176, 0.248, 0.391, 0.678, 0.280, 0.352, 0.496, 0.783, 1.112, 0.566, 0.711, 1.001, 1.352, 1.599, 1.845, 3.176, 1.057, 1.260, 1.586, 1.816, 2.191],
          },
          {
              label: "Google",
              backgroundColor: 'rgb(214, 39, 40)',
              borderColor: 'rgb(214, 39, 40)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [0.048, 0.051, 0.057, 0.069, 0.096, 0.102, 0.114, 0.138, 0.186, 0.192, 0.204, 0.228, 0.276, 0.372, 0.383, 0.407, 0.455, 0.551, 0.744, 0.766, 0.814, 0.910, 1.103, 1.295, 1.487, 2.257, 1.532, 1.628, 1.821, 2.013, 2.205],
          },
          {
              label: "AWS",
              backgroundColor: 'rgb(255, 128, 15)',
              borderColor: 'rgb(255, 128, 15)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [0.009, 0.016, 0.029, 0.057, 0.041, 0.055, 0.083, 0.139, 0.250, 0.106, 0.134, 0.190, 0.301, 0.524, 0.236, 0.292, 0.403, 0.626, 1.072, 0.497, 0.608, 0.831, 1.276, 1.722, 2.167, 3.949, 1.018, 1.240, 1.686, 2.131, 2.577],
          },
          {
              label: "Azure",
              backgroundColor: 'rgb(31, 119, 180)',
              borderColor: 'rgb(31, 119, 180)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [0.153, 0.155, 0.158, 0.165, 0.216, 0.220, 0.226, 0.239, 0.265, 0.343, 0.349, 0.362, 0.388, 0.440, 0.596, 0.609, 0.635, 0.687, 0.791, 1.101, 1.127, 1.179, 1.283, 1.387, 1.491, 1.908, 2.112, 2.164, 2.268, 2.372, 2.476],
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