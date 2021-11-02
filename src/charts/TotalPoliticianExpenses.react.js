import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import ReactECharts from '../components/ReactECharts.react';

export default class TotalPoliticianExpenses extends Component {

  constructor(props) {
    super(props);

    this.state = {
      option: this.totalPoliticianExpenses(this.props.data)
    }
  }

  totalPoliticianExpenses(data) {
    return {
      xAxis: {
        type: 'category',
        data: data.x
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: data.y,
          type: 'bar'
        }
      ]
    }
  }

  render() {
    return (
      <div className="chart-wrapper expenses-totals-wrapper">
        <span className="chart-title">Despesas</span>
        <ReactECharts option={this.state.option} />
      </div>
    );
  }

}
