ctx = document.getElementById('myChart').getContext('2d');

myData = document.getElementById('canvasDay0').dataset.graphics;
myData = myData.split(',').map(x=>Number(x));

const chartData = {
  labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
  datasets: [{
    label: 'Temperature',
    data: myData,
    backgroundColor: 'rgba(127, 127, 0, 0.5)',
    borderColor:  'rgba(127, 127, 0, 1)',
    borderWidth: 1
  }]
};

const chartOpt = {
  scales: {
    yAxes: [{
      gridLines: {
        drawOnChartArea: false,
        drawBorder: false
      },
      ticks: {
        display: false,
        beginAtZero: true
      }
    }],
    xAxes: [{
      gridLines: {
        drawOnChartArea: false,
      }
    }]
  },
  hover: {
    animationDuration: 0
  },
  animation: {
    duration: 1,
    onComplete: function () {
      var chartInstance = this.chart,
        ctx = chartInstance.ctx;
      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';

      this.data.datasets.forEach(function (dataset, i) {
        var meta = chartInstance.controller.getDatasetMeta(i);
        meta.data.forEach(function (bar, index) {
          var data = dataset.data[index];                            
          ctx.fillText(data, bar._model.x, bar._model.y - 5);
        });
      });
    }
  }
};			
      
var myChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOpt
  });