import React, {Component} from 'react';
import { Link } from "react-router-dom";
import TotalPoliticianExpenses from '../charts/TotalPoliticianExpenses.react';
import ByCategoryPoliticianExpenses from '../charts/ByCategoryPoliticianExpenses.react';
import LastPoliticianExpenses from '../charts/LastPoliticianExpenses.react';
import Modal from 'react-modal';
import datetime from '../bin/datetime';


import api from "../services/api";


export default class Politician extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      openModal: false,
      usermail: '',
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onFollow = this.onFollow.bind(this);
    this.handleOnChangeModal = this.handleOnChangeModal.bind(this);
  }

  openModal() {
    this.setState({
      openModal: true,
    });
  }

  closeModal() {
    this.setState({
      openModal: false,
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getPoliticianData(this.props.id);
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

  handleOnChangeModal(e) {
    this.setState({
      usermail: e.target.value,
    })
  }

  onFollow() {
    api.get(`/follow/${this.state.usermail}&${this.props.id}`)
      .then((res) => {
        console.log(`Subscription for ${this.state.usermail}&${this.props.id}`)
        this.closeModal()
      }).catch((err) => {
        console.error("Couldn't follow the politician. " + err);
        this.closeModal()
      });

  }

  render() {
    const customStyles = {
      content: {
        maxWidth: '600px',
        minWidth: '380px',
        maxHeight: '200px',
        top: '50%',
        left: '50%',
        transform:' translate(-50%, -50%)',
        borderRadius: '15px',
        border: 'none',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    };

    if (this.state.data !== null) {
      return (
        <div className="main-wrapper">
          <div className='profile-wrapper'>

            <div className='profile-image' style={{
              backgroundImage: `url(${this.state.data.photo_url})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
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

            <button
              className="profile-follow-btn"
              onClick={this.openModal}
            >
              Seguir
            </button>
            <Modal
              ariaHideApp={false}
              style={customStyles}
              isOpen={this.state.openModal}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal">

              <div className="follow-modal-container">
                <div className="follow-modal-header">
                  <span className="follow-modal-name">{this.state.data.name}</span>
                  <button className="follow-modal-close-btn" onClick={this.closeModal}>Fechar</button>
                </div>

                <span className="follow-modal-title">Para receber notificações do político, insira seu email.</span>
                <div className="follow-modal-input-wrapper">
                  <input
                    className="follow-modal-input"
                    type="text"
                    placeholder="Seu email aqui"
                    value={this.state.usermail}
                    onChange={this.handleOnChangeModal}/>
                  <button
                    className="follow-modal-follow-btn"
                    onClick={this.onFollow}
                  >
                    Seguir
                  </button>
                </div>

              </div>

            </Modal>

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
                      <span className="mandate-period">{datetime.getYear(d.yearStart)} - {datetime.getYear(d.yearEnd)}</span>
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
