import { el, mount } from '../lib/redom.es.min.js';
import { Parser } from './parser.js';
import { CreditorComponent } from './creditor-component.js';
import { StatisticChartComponent } from './statistic-chart-component.js';

export class AppComponent {
  constructor() {
    this.el = el('.container', [
      el('.row', [
        el('.col-sm', [
          el('h1', 'Visualizer for CAMT'),
          el('form', [
            this.dataInput = el('textarea.form-control',{placeholder: 'Please copy paste the csv content here'}),
            el('br'),
            el('button.btn.btn-primary', {
              type: 'button', onclick: () => {
                this.turnover = Parser(this.dataInput.value);
                this.dataInput.value = '';
                mount(this.el, new StatisticChartComponent(this.turnover.creditors));
                mount(this.el, el('.row', el('.col-sm',[el('h1', 'Details'),el('hr')])));
                Object.keys(this.turnover.creditors).forEach(key=>{
                  mount(this.el, new CreditorComponent(this.turnover.creditors[key]));
                });
              }
            }, 'Parse Data'),
          ]),
    
          el('hr'),
        ]),
      ]),
    ]);
  }
}
