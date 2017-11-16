import { el } from '../lib/redom.es.min.js';
import { Parser } from './parser.js';

export class CreditorComponent {
  constructor(creditorData) {
    this.creditorData = creditorData;
    this.el = el('.row',
      el('.col-sm',[
        el('.card', [
          el('.card-header', el('strong', this.creditorData.id)),
          el('.card-body',
            el('table.table-striped.table-sm', [
              el('thead.thead-dark',
                el('tr', [
                  el('th', 'Datum'),
                  el('th', 'Verwendungszweck'),
                  el('th', 'GlaeubigerID'),
                  el('th', 'Glaeubiger'),
                  el('th', 'Betrag'),
                ])
              ),
              el('tbody',
                this.creditorData.entries.map(entry => el('tr', [
                  el('td', entry.date),
                  el('td', entry.usage),
                  el('td', entry.creditor),
                  el('td', entry.target),
                  el('td', `${entry.value} €`),
                ]))
              )
            ]),
          ),
          el('.card-footer',el('strong', `Summe: ${this.creditorData.sum} €`))
        ]),
        el('hr')
      ]
      )
    );
  }
}