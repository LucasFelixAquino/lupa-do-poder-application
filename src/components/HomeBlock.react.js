import React, {Component} from 'react';


export default class HomeBlock extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{background: {this.props.background}}} className="navbar">
      </div>
    );
  }
}
