import React, {Component} from 'react';
import { Link } from "react-router-dom";
import TotalPoliticianExpenses from '../charts/TotalPoliticianExpenses.react';
import ByCategoryPoliticianExpenses from '../charts/ByCategoryPoliticianExpenses.react';
import LastPoliticianExpenses from '../charts/LastPoliticianExpenses.react';


import api from "../services/api";


export default class Politician extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  getPoliticianData(id) {
      api.get(`/politiciansPage/${id}`)
        .then((res) => this.setState({
          data: res.data
        }))
        .catch((err) => {
          console.error("Couldn't get politician data. " + err);
        });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getPoliticianData(this.props.id);
  }

  render() {
    if (this.state.data !== null) {
      return (
        <div className="main-wrapper">
          <div className='profile-wrapper'>

            <div className='profile-image' style={{
              backgroundImage: `url(${this.state.data.photo_url})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}></div>

            <div className='profile-info'>
              <div className="profile-header">
                <span className="profile-header__name">{this.state.data.name}</span>
                <span className="profile-header__age">{this.state.data.age} anos</span>
              </div>

              <div className="profile-cur-mandate">
                <span className="profile-cur-mandate__name">
                  {this.state.data.currentRole.name}
                  <span className="profile-cur-mandate__party">{this.state.data.currentRole.party.acronym}</span>
                </span>

                <span className="profile-cur-mandate__stateCity">
                  {this.state.data.currentRole.city == null
                    ? this.state.data.currentRole.state
                    : this.state.data.currentRole.city + ' - ' + this.state.data.currentRole.state}
                </span>

              </div>
            </div>

            <button className="profile-follow-btn">Seguir</button>

          </div>





          <div className="profile-middle-section">

            <div className="simple-table-wrapper">
              <div className="simple-table-header">
                <span>Mandatos</span>
                <span>{this.state.data.mandates.length}</span>
              </div>

              <div className="simple-table-body">
                {this.state.data.mandates.map((d, i) => (
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


            {this.state.data.propositions.length > 0 && (
              <div className="simple-table-wrapper">
                <div className="simple-table-header">
                  <span>Proposições</span>
                </div>

                <div className="simple-table-body">
                  {this.state.data.propositions.map((d, i) => (
                    <div key={i} className="simple-table-row proposition-row">
                      <span className="proposition-name">{d.name}</span>
                      <span className="proposition-simplified-thread">{d.simplifiedThread}</span>
                      <span className="proposition-info"><Link to={`/proposicoes/${d.id}`}>Saiba mais</Link></span>
                    </div>

                  ))}
                </div>

              </div>
            )}




          </div>

          {this.state.data.expenses.totals.x.length > 0 && (
            <div className="expenses-wrapper">
              <TotalPoliticianExpenses data={this.state.data.expenses.totals} />

              <div className="expenses-category-wrapper">
                <ByCategoryPoliticianExpenses data={this.state.data.expenses.byCategory} />
                <LastPoliticianExpenses data={this.state.data.expenses.lastExpenses} />
              </div>
            </div>
          )}
        </div>
      );
    }
    else {
      return (<div></div>)
    }
  }
}
