import React, {Component} from 'react';
import { ReactComponent as Search } from '../static/svgs/search-solid.svg';
import { Link } from "react-router-dom";

import api from "../services/api";

export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      input: '',
      data: [],
    }

    this.wrapperRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        active: false,
        input: '',
      })
    }
  }

  handleChange(e) {
    this.setState({
      input: e.target.value,
    })
  }

  getSearchResults() {
      api.get(`/politiciansSearch?pesquisa=${this.state.input}`)
        .then((res) => {
          this.setState({
            active: true,
            data: res.data
          })

          console.log(this.state)
      })
        .catch((err) => {
          console.error("Couldn't get search results. " + err);
        });

  }


  handleSubmit(e) {
    if (this.state.input.length > 0) {
      this.getSearchResults();
    }

    e.preventDefault()
  }



  render() {

    const deactivateMenu = () => {
      this.props.deactivateMenu()
    }

    return (
      <div className="searchbar-wrapper" ref={this.wrapperRef}>
        <form
        method="get"
        className="search-container"
        autoComplete="off"
        onSubmit={this.handleSubmit}>
          <input
          type="text"
          value={this.state.input}
          onChange={e => this.handleChange(e)}
          className="search-input"
          placeholder="Buscar" />

          <button type="submit" className="search-icon-wrapper">
            <Search className="search-icon" />
          </button>
        </form>

        {this.state.active && (
          <div className="search-results-wrapper">
            {this.state.data.map(d => (
              <Link
                to={`/politicos/${d.id}`}
                className="search-result-wrapper"
                onClick={deactivateMenu}
              >

                <div className="search-result-image" style={{
                  backgroundImage: `url(${d.url_photo})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                }}>
                </div>

                <div className="search-result-body">
                  <span className="search-result-name">{d.name.toLowerCase()}</span>
                  <div className="search-result-details">
                    <span className="search-result-details__state">{d.role}</span>
                    <span className="search-result-details__party">{d.partyname}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}


      </div>
    );
  }


}
