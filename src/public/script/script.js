// 'data' chart parameter
function genChartData(day){ 
  myData = document.getElementById('canvasDay'+day).dataset.graphics;
  myData = myData.split(',').map(x=>Number(x));
  const chartData = {
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [{
      label: 'Temperature',
      data: myData,
      backgroundColor: 'rgba(255, 0, 0, 0.3)',
      borderColor:  'rgba(255, 0, 0, 1)',
      borderWidth: 1
    }]
  };
  return chartData;
}

// 'options' chart parameter
const chartOpt = {
  maintainAspectRatio: false,
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

// generate charts
const charts=5;
for(i=0; i<charts; i++){
  var ctx = document.getElementById('myChart'+i).getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: genChartData(i),
      options: chartOpt
  });
};