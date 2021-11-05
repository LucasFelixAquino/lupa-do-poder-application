import React, {Component} from 'react';
import { ReactComponent as Search } from '../static/svgs/search-solid.svg';
import { Link } from "react-router-dom";

import Modal from 'react-modal';
import { ReactComponent as Close } from '../static/svgs/close.svg';

import api from "../services/api";

export default class FollowModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
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

    return (
      <Modal
        style={customStyles}
        isOpen={this.props.openModal}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal">

        <div className="follow-modal-container">
          <div className="follow-modal-header">
            <span className="follow-modal-name">{this.props.name}</span>
            <button className="follow-modal-close-btn" onClick={this.closeModal}><Close /></button>
          </div>

          <span className="follow-modal-title">Para receber notificações do político, insira seu email.</span>
          <div className="follow-modal-input-wrapper">
            <input className="follow-modal-input" type="text" placeholder="Seu email aqui" />
            <button className="follow-modal-follow-btn">Seguir</button>
          </div>

        </div>

      </Modal>
    );
  }


}
