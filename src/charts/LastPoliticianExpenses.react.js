import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

function formatCurrency(value) {
  return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}

export default class LastPoliticianExpenses extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chart-wrapper expenses-last-wrapper">
        <span className="chart-title">Últimas despesas</span>
        <div className="expenses-last-wrapper">
          <table className="expenses-last-table">
            <tr>
              <th>Data</th>
              <th>Tipo da despesa</th>
              <th>Valor</th>
            </tr>

            {this.props.data.map(d => (
              <tr>
                <td>{d.date}</td>
                <td>{d.category}</td>
                <td>{formatCurrency(d.value)}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }

}
