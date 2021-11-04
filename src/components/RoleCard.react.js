import React, {Component} from 'react';
import { Link } from "react-router-dom";

export default class RoleCard extends Component {
  constructor(props) {
    super(props);

    this.backgroundId = Math.ceil(Math.random() * 20);
  }

  render() {
    return (
      <Link to={`/competencias/${this.props.id}`}>
          <div className="role-card-wrapper">
            <div className={"role-card-header abs-" + this.backgroundId}>
            </div>

            <div className="role-card-body">
              <span className="role-card-body__branch">{this.props.branch}</span>
              <span className="role-card-body__role">{this.props.name}</span>
            </div>
          </div>
      </Link>
    );
  }
}
