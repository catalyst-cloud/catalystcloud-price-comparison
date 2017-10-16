
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["c1.c1r1","c1.c1r2","c1.c1r4","c1.c2r1","c1.c2r2","c1.c2r4","c1.c2r8","c1.c2r16","c1.c4r2","c1.c4r4","c1.c4r8","c1.c4r16","c1.c4r32","c1.c8r4","c1.c8r8","c1.c8r16","c1.c8r32","c1.c8r64","c1.c16r8","c1.c16r16","c1.c16r32","c1.c16r64","c1.c32r16","c1.c32r32","c1.c32r64","c1.c32r96","c1.c32r128"],
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
              data: [0.0437610938,0.07833875,0.118391875,0.1026759375,0.1345521875,0.1654596875,0.186441875,0.2505132813,0.25409375,0.2862842188,0.3015775,0.3672703125,0.505196875,0.556131875,0.5769507813,0.6159903125,0.7787853125,1.217,1.0682814063,1.109985625,1.2055009375,1.6836339063,2.1846876563,2.2953854688,2.7035153125,2.7742146875,2.972113125],
          },
          {
              label: "AWS",
              backgroundColor: 'rgb(255, 128, 15)',
              borderColor: 'rgb(255, 128, 15)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [0.029494375,0.0411335938,0.09584625,0.0601673438,0.0678696875,0.1169142188,0.1815547846,0.2132944688,0.3242401172,0.3316405859,0.3604662422,0.3534792214,0.4854537604,0.6482006563,0.6763712813,0.6808841458,0.7374801042,0.9756333594,1.2179825,1.2346878125,1.361530625,1.41511,2.4843239063,2.6062251042,2.8783245313,3.0362246875,3.1755165625],
          },
          {
              label: "Azure",
              backgroundColor: 'rgb(31, 119, 180)',
              borderColor: 'rgb(31, 119, 180)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [0.06134375,0.087453125,0.149828125,0.094734375,0.114,0.1798125,0.259765625,0.32,0.245640625,0.274484375,0.374984375,0.46,0.698,0.612015625,0.651703125,0.7493125,0.9338125,1.11646875,1.197125,1.241796875,1.483703125,1.584890625,1.3285625,1.580578125,1.69446875,1.9074375,1.999390625],
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
