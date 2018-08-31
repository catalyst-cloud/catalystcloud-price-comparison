
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [{{ labels }}],
        datasets: [
          {
              label: "Catalyst",
              backgroundColor: 'rgb(45, 160, 45)',
              borderColor: 'rgb(45, 160, 45)',
              pointRadius: 0,
              borderWidth: 5,
              tension: 0,
              fill: false,
              data: [{{ catalyst_data }}],
          },
          {
              label: "Google (Sydney)",
              backgroundColor: 'rgb(51, 172, 204)',
              borderColor: 'rgb(51, 172, 204)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [{{ google_data }}],
          },
          {
              label: "AWS (Sydney)",
              backgroundColor: 'rgb(39, 118, 140)',
              borderColor: 'rgb(39, 118, 140)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [{{ aws_data }}],
          },
          {
              label: "Azure (Sydney)",
              backgroundColor: 'rgb(29, 65, 78)',
              borderColor: 'rgb(29, 65, 78)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [{{ azure_data }}],
          }
        ]
    },

    // Configuration options go here
    options: {
      responsive: true,
      title:{
          display:false,
          text:'Comparison of on-demand compute per hour',
          fontSize: 22
      },
      legend: {
        position: 'right',
        display: false,
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
              ticks: {
                display: false
              }
          }],
          yAxes: [{
              display: true,
              gridLines: {
                display: false
              },

              ticks: {
                display: false
              }
          }]
      }
  }
});
