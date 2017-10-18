
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
        labels: ["Catalyst", "Google", "Amazon", "Azure"],
        datasets: [{
          data: [0.2, 0.03629626, 0.03490025, 0.0747],
          backgroundColor: ['rgb(45, 160, 45)', 'rgb(214, 39, 40)', 'rgb(255, 128, 15)', 'rgb(31, 119, 180)'],
          borderColor: ['rgb(45, 160, 45)', 'rgb(214, 39, 40)', 'rgb(255, 128, 15)', 'rgb(31, 119, 180)'],
          borderWidth: 2
        }]
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
        display: false
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
          yAxes: [{
              ticks: {
                    callback: function(value, index, values) {
                      return '$' + value.toFixed(2);
                    }
                }
          }]
      }
  }
});
