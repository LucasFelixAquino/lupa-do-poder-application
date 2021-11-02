import React, {Component} from 'react';
import { Link } from "react-router-dom";

function getBackgroundId(position) {
  return (position % 4) + 1
}

export default class RoleCard extends Component {
  render() {
    return (
      <Link to={`/competencias/${this.props.id}`}>
          <div className="role-card-wrapper">
            <div className={"role-card-header abs-" + getBackgroundId(this.props.position)}>
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
