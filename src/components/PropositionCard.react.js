import React, {Component} from 'react';
import { Link } from "react-router-dom";

function getBackgroundId(position) {
  return (position % 4) + 1
}

export default class PropositionCard extends Component {
  constructor(props) {
    super(props);

    this.backgroundId = Math.ceil(Math.random() * 20);
  }
  
  render() {
    return (
      <Link className="proposition-card-wrapper" to={`/proposicao/${this.props.id}`}>

          <div
            className={"proposition-card-header abs-" + this.backgroundId}>
            <span className="proposition-card-header__title">{this.props.name}</span>
          </div>

          <div className="proposition-card-body">
            <span className="proposition-card-body__simplified-thread">{this.props.simplifiedThread}</span>

            <div className="proposition-card-status-wrapper">
              <span className="proposition-card-body__status-title">Situação</span>
              <span className="proposition-card-body__status">{this.props.status}</span>
            </div>
          </div>

      </Link>
    );
  }
}
