
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
              label: "Google",
              backgroundColor: 'rgb(214, 39, 40)',
              borderColor: 'rgb(214, 39, 40)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [{{ google_data }}],
          },
          {
              label: "Amazon",
              backgroundColor: 'rgb(255, 128, 15)',
              borderColor: 'rgb(255, 128, 15)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0,
              fill: false,
              data: [{{ aws_data }}],
          },
          {
              label: "Azure",
              backgroundColor: 'rgb(31, 119, 180)',
              borderColor: 'rgb(31, 119, 180)',
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
