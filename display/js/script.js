
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [2,3,5,3,4,6,10,18,6,8,12,20,36,12,16,24,40,72,24,32,48,80,48,64,96,128,160],
        datasets: [
          {
              label: "Catalyst",
              backgroundColor: 'rgb(45, 160, 45)',
              borderColor: 'rgb(45, 160, 45)',
              pointRadius: 0,
              borderWidth: 5,
              tension: 0,
              fill: false,
              data: [0.044,0.062,0.098,0.07,0.088,0.124,0.196,0.339,0.14,0.176,0.248,0.391,0.678,0.28,0.352,0.496,0.783,1.112,0.566,0.711,1.001,1.352,1.057,1.26,1.586,1.816,2.191],
          },
          {
              label: "Google",
              backgroundColor: 'rgb(214, 39, 40)',
              borderColor: 'rgb(214, 39, 40)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [0.035936,0.065498,0.103079,0.114459,0.138098,0.154654,0.201505,0.279824,0.252134,0.270619,0.303114,0.394426,0.517091,0.575152,0.609607,0.642999,0.764082,1.126648,1.100653,1.14517,1.270682,1.609139,2.215625,2.353492,2.772158,2.899581,3.120247],
          },
          {
              label: "AWS",
              backgroundColor: 'rgb(255, 128, 15)',
              borderColor: 'rgb(255, 128, 15)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [0.028745,0.043465,0.088082,0.074562,0.083121,0.119331,0.174281,0.208991,0.321487,0.329594,0.354482,0.350454,0.501744,0.639512,0.649106,0.66011,0.689416,0.966135,1.298151,1.303541,1.428417,1.490124,2.181423,2.262427,2.588365,2.799376,2.88115],
          },
          {
              label: "Azure",
              backgroundColor: 'rgb(31, 119, 180)',
              borderColor: 'rgb(31, 119, 180)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [0.067562,0.087703,0.138484,0.109266,0.125781,0.178406,0.253453,0.338609,0.246344,0.280797,0.371078,0.444313,0.637312,0.559406,0.596359,0.716813,0.872516,1.104109,1.393203,1.437078,1.631219,1.774266,1.508328,1.702469,1.84075,2.085609,2.231141],
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
                  labelString: 'GB RAM + vCPUs',
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
