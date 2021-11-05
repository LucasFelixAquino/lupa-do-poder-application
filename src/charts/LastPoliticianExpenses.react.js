import React, {Component} from 'react';
import datetime from '../bin/datetime';
import str from '../bin/str';
export default class LastPoliticianExpenses extends Component {


  render() {
    return (
      <div className="chart-wrapper expenses-last-wrapper">
        <span className="chart-title">Últimas despesas</span>
        <div className="expenses-last-wrapper">
          <table className="expenses-last-table">
            <thead>
            <tr>
              <th>Data</th>
              <th>Tipo da despesa</th>
              <th>Valor</th>
            </tr>
            </thead>

            <tbody>
            {this.props.data.map((d, i) => (
              <tr key={i}>
                <td>{datetime.toBrazilFormat(d.date)}</td>
                <td>{str.toTitleCase(d.category)}</td>
                <td>{str.toBRL(d.value)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}
