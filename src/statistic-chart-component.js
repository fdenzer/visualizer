import { el } from '../lib/redom.es.min.js';


export class StatisticChartComponent {
  constructor(creditors) {
    this.el = el('.row', {style: 'padding-bottom:600px'},
      el('.col-sm', [
        el('h1', 'Statistic'),
        this.pieCanvas = el('canvas'),
        this.barCanvas = el('canvas'),
      ],
      )
    );
    const labels = Object.keys(creditors);
    const data = Object.keys(creditors).map(key => Math.abs(creditors[key].sum));
    const backgroundColor = data.map(() => `rgb(${_.random(0, 255)},${_.random(0, 255)},${_.random(0, 255)})`);


    let pieChart = new Chart(this.pieCanvas.getContext('2d'), {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      }
    });
    pieChart.canvas.parentNode.style.height = '500px';

    let barChart = new Chart(this.barCanvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      }
    });
    barChart.canvas.parentNode.style.height = '500px';

  }
}