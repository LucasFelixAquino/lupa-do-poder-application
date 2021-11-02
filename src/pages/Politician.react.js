import React, {Component} from 'react';
import { Link } from "react-router-dom";


import ReactECharts from '../components/ReactECharts.react';
import TotalPoliticianExpenses from '../charts/TotalPoliticianExpenses.react';
import ByCategoryPoliticianExpenses from '../charts/ByCategoryPoliticianExpenses.react';


import api from "../services/api";


export default class Politician extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'Tabata Amaral',
      age: 27,
      photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/204534.jpg',
      currentRole: {
        id: 12,
        name: 'Atual Deputado Federal',
        state: 'São Paulo',
        city: null,
        party: {
          id: 1,
          acronym: 'PDT',
        },
      },


      mandates: [
        {id: 12, name: 'Deputada Federal', yearStart: '2019', yearEnd: '2022', stateCity: 'São Paulo'},
      ],

      propositions: [
        {id: 1, name: 'PL 1672/2019', simplifiedThread: 'Repasses para a Educação'},
        {id: 1, name: 'PL 1672/2019', simplifiedThread: 'Repasses para a Educação'},
        {id: 1, name: 'PL 1672/2019', simplifiedThread: 'Repasses para a Educação'},
        {id: 1, name: 'PL 1672/2019', simplifiedThread: 'Repasses para a Educação'},
        {id: 1, name: 'PL 1672/2019', simplifiedThread: 'Repasses para a Educação'},
      ],

      expenses: {
        totals: {
          x: ['2019-01-01', '2019-02-01', '2019-03-01', '2019-04-01', '2019-05-01', '2019-06-01', '2019-07-01', '2019-08-01', '2019-09-01', '2019-10-01', '2019-11-01', '2019-12-01',
              '2020-01-01', '2020-02-01', '2020-03-01', '2020-04-01', '2020-05-01', '2020-06-01', '2020-07-01', '2020-08-01', '2020-09-01', '2020-10-01', '2020-11-01', '2020-12-01',
              '2021-01-01', '2021-02-01', '2021-03-01', '2021-04-01', '2021-05-01', '2021-06-01', '2021-07-01', '2021-08-01', '2021-09-01', '2021-10-01', '2021-11-01', '2021-12-01'],
          y: [3892.1, 3982.27, 2393.19, 1099.99, 5487.00, 3892.1, 3982.27, 2393.19, 1099.99, 5487.00, 3982.27, 2393.19,
              3892.1, 3982.27, 2393.19, 1099.99, 5487.00, 3892.1, 3982.27, 2393.19, 1099.99, 5487.00, 3982.27, 2393.19,
              3892.1, 3982.27, 2393.19, 1099.99, 5487.00, 3892.1, 3982.27, 2393.19, 1099.99, 5487.00, 3982.27, 2393.19,],
        },
        byCategory: {
          2021: {
            x: ['Viagem', 'Contratações de serviços', 'Manutenção de escritório', 'Combustível', 'Transporte', 'Alimentação'],
            y: [183000, 84000, 32000, 8000, 5000, 1000]
          },

          2020: {
            x: ['Viagem', 'Contratações de serviços', 'Manutenção de escritório', 'Combustível', 'Transporte', 'Alimentação'],
            y: [183000, 84000, 32000, 1000, 5000, 3000]
          },

          2019: {
            x: ['Viagem', 'Contratações de serviços', 'Manutenção de escritório', 'Combustível', 'Transporte', 'Alimentação'],
            y: [183000, 84000, 12000, 8000, 5000, 3000]
          },
        },

        lastExpenses: [
          {date: '2021-09-25', category: 'Combustível', value: 483.19},
          {date: '2021-09-23', category: 'Pacote Adobe', value: 196.11},
          {date: '2021-09-21', category: 'Passagem Aérea', value: 789.99},
          {date: '2021-09-21', category: 'Manutenção de Gabinete', value: 1234.},
          {date: '2021-09-17', category: 'Gráfica', value: 200},
          {date: '2021-09-17', category: 'Combustível', value: 196.56},
          {date: '2021-09-15', category: 'Passagem Aérea', value: 459.99},
          {date: '2021-09-14', category: 'Passagem Aérea', value: 459.99},
          {date: '2021-09-13', category: 'Passagem Aérea', value: 459.99},
        ],
      },


    }
  }

  getPoliticianData(id) {
      api.get(`/politician/${id}`)
        .then((res) => this.setState({...res.data}))
        .catch((err) => {
          console.error("Couldn't get politician data. " + err);
        });

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getPoliticianData();
  }

  render() {
    return (
      <div className="main-wrapper">

        <div className='profile-wrapper'>

          <div className='profile-image' style={{
            backgroundImage: `url(${this.state.photoUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}></div>

          <div className='profile-info'>
            <div className="profile-header">
              <span className="profile-header__name">{this.state.name}</span>
              <span className="profile-header__age">{this.state.age} anos</span>
            </div>

            <div className="profile-cur-mandate">
              <span className="profile-cur-mandate__name">
                {this.state.currentRole.name}
                <span className="profile-cur-mandate__party">{this.state.currentRole.party.acronym}</span>
              </span>

              <span className="profile-cur-mandate__stateCity">
                {this.state.currentRole.city == null
                  ? this.state.currentRole.state
                  : this.state.currentRole.state + '-' + this.state.currentRole.city}
              </span>

            </div>
          </div>

          <button className="profile-follow-btn">Seguir</button>

        </div>





        <div className="profile-middle-section">

          <div className="simple-table-wrapper">
            <div className="simple-table-header">
              <span>Mandatos</span>
              <span>{this.state.mandates.length}</span>
            </div>

            <div className="simple-table-body">
              {this.state.mandates.map((d, i) => (
                <div key={i} className="simple-table-row mandate-row">
                  <span className="mandate-name">
                    <Link to={`/competencias/${d.id}`}>{d.name}</Link>
                    <span className="mandate-period">{d.yearStart} - {d.yearEnd}</span>
                  </span>
                  <span className="mandate-statecity">{d.stateCity}</span>
                </div>
              ))}
            </div>

          </div>


          <div className="simple-table-wrapper">
            <div className="simple-table-header">
              <span>Proposições</span>
            </div>

            <div className="simple-table-body">
              {this.state.propositions.map((d, i) => (
                <div key={i} className="simple-table-row proposition-row">
                  <span className="proposition-name">{d.name}</span>
                  <span className="proposition-simplified-thread">{d.simplifiedThread}</span>
                  <span className="proposition-info"><Link to={`/proposicoes/${d.id}`}>Saiba mais</Link></span>
                </div>

              ))}
            </div>

          </div>


        </div>

        <div className="expenses-wrapper">
          <TotalPoliticianExpenses data={this.state.expenses.totals} />

          <div className="expenses-category-wrapper">
            <ByCategoryPoliticianExpenses data={this.state.expenses.byCategory} />
          </div>
        </div>


      </div>
    );
  }
}
