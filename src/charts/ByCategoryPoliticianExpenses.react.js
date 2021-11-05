import React, {Component} from 'react';

import ReactECharts from '../components/ReactECharts.react';
import str from '../bin/str';

export default class ByCategoryPoliticianExpenses extends Component {

  constructor(props) {
    super(props);

    this.state = {
      option: {
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['1'],
        },
        series: [
          {
            data: [1],
            type: 'bar'
          }
        ]
      },
      yearActive: Object.keys(this.props.data).sort().slice(-1).pop(),
    }

    this.changeOption = this.changeOption.bind(this);
    this.toggleYear = this.toggleYear.bind(this);
  }

  changeOption() {
    const data = this.props.data[this.state.yearActive];

    const option = {
      tooltip: {
        show: true,
        formatter: '{b}<br />R$ {c}'
      },
      grid: {
        left: 180,
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: data.x.map(d => str.toTitleCase(d)),
        axisLabel: {
          width: 160,
          overflow: 'truncate',
        }
      },
      series: [
        {
          data: data.y,
          type: 'bar',
          itemStyle: {
            color: '#37C280',
            borderRadius: 4,
          }
        }
      ]
    };

    this.setState({option})
  }

  componentDidMount() {
    this.changeOption();
  }

  toggleYear(year) {
    this.setState({
      yearActive: year,
    });

    this.changeOption();
  }

  render() {
    return (
      <div className="chart-wrapper expenses-by-category-wrapper">
        <span className="chart-title">Despesas por categoria</span>
        <div className="years-wrapper">
          {Object.keys(this.props.data).map((d, i) => (
            <button key={i}
              className={"year-span " + (d === this.state.yearActive
                ? 'active'
                : '')}
              onClick={() => this.toggleYear(d)}>
              {d}
            </button>
          ))}
        </div>
        <ReactECharts option={this.state.option} />
      </div>
    );
  }

}
