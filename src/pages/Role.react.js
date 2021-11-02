import React, {Component} from 'react';
import { Link } from "react-router-dom";
import RoleCard from '../components/RoleCard.react';

import api from "../services/api";

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default class Role extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Deputado Federal',
      description: '<p>O deputado federal é o representante do povo no Congresso Nacional e seu mandato é de 4 anos, não havendo limite para a reeleição. Para se candidatar a esse cargo é preciso atender os seguintes requisitos:</p><ul><li>Ter idade mínima de 21 anos</li><li>Estar inscrito em algum partido político</li><li>Ter nacionalidade brasileira</li><li>Possuir domicílio eleitoral no estado pelo qual está concorrendo ao cargo</li><li>Ter pleno exercício dos direitos políticos</li></ul>'
    }
  }

  getRoleData(id) {
      api.get(`/roles/${id}`)
        .then((res) => this.setState({
          title: res.title,
          description: res.description,
        }))
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
