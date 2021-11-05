import React, {Component} from 'react';
import ReactECharts from '../components/ReactECharts.react';
import datetime from '../bin/datetime';

export default class TotalPoliticianExpenses extends Component {

  constructor(props) {
    super(props);

    this.state = {
      option: this.totalPoliticianExpenses(this.props.data)
    }
  }

  totalPoliticianExpenses(data) {
    return {
      tooltip: {
        show: true,
        formatter: 'R$ {c}'
      },
      xAxis: {
        type: 'category',
        data: data.x.map(d => datetime.toBrazilFormat(d))
      },
      yAxis: {
        type: 'value',
        name: 'R$',
      },
      series: [
        {
          data: data.y,
          type: 'bar',
          barCategoryGap: '15%',
          itemStyle: {
            color: '#37C280',
            borderRadius: 4,
          }
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
