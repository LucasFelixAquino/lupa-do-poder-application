import React, {Component} from 'react';
import { Link } from "react-router-dom";
import RoleCard from '../components/RoleCard.react';

import api from "../services/api";

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default class Role extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: ''
    }
  }

  getRoleData(id) {
      api.get(`roles/${id}`)
          .then((res) => {
            this.setState({
              title: res.data.name,
              description: res.data.description,
            });
          })
        .catch((err) => {
          console.error("Couldn't get role. " + err);
        });

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getRoleData(this.props.id);
  }

  render() {
    return (
      <div className="main-wrapper">

        <div className="role-image"></div>
        <div className="role-body">
          <span className="role-name">{this.state.title}</span>
          <div className="role-text">
            {ReactHtmlParser(this.state.description)}
          </div>
        </div>

      </div>
    );
  }
}
