import React, {Component} from 'react';
import { Link } from "react-router-dom";

import { ReactComponent as ColorfulLogoHorizontal } from '../static/svgs/colorful-logo-horizontal.svg';

import PropositionCard from '../components/PropositionCard.react';

import api from "../services/api";


export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      propositions: [
        {id: 232, name: 'PL 234/2021', simplifiedThread: 'Abre crédito extraordinário em favor do Ministério da Saúde.', status: 'Aguardando início de comissão temporária'},
        {id: 232, name: 'PL 234/2021', simplifiedThread: 'Abre crédito extraordinário em favor do Ministério da Saúde.', status: 'Aguardando início de comissão temporária'},
        {id: 232, name: 'PL 234/2021', simplifiedThread: 'Abre crédito extraordinário em favor do Ministério da Saúde.', status: 'Aguardando início de comissão temporária'},
        {id: 232, name: 'PL 234/2021', simplifiedThread: 'Abre crédito extraordinário em favor do Ministério da Saúde. Abre crédito extraordinário em favor do Ministério da Saúde. Abre crédito extraordinário em favor do Ministério da Saúde. Abre crédito extraordinário em favor do Ministério da Saúde.', status: 'Aguardando início de comissão temporária'},
        {id: 232, name: 'PL 234/2021', simplifiedThread: 'Abre crédito extraordinário em favor do Ministério da Saúde.', status: 'Aguardando início de comissão temporária'},
      ],
    }
  }

  getLastPropositions() {
      api.get("/lastPropositions/4")
        .then((res) => this.setState({
          propositions: res.data,
        }))
        .catch((err) => {
          console.error("Couldn't get last propositions. " + err);
        });

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getLastPropositions();
  }

  render() {
    return (
      <div className="main-wrapper">
        <div className="home-block">
          <ColorfulLogoHorizontal className="logo-horizontal" />
          <p className="home-slogan">Valorize resultados, não personalidades.</p>
        </div>

        <div className="home-block">
          <h1 className="home-block-title">
            A vida pública <span className="white">descomplicada</span><span className="blue">.</span>
          </h1>
          <p className="home-block-subtitle">A Lupa do Poder facilita tudo o que acontece na política e te ajuda a acompanhar seus políticos de perto.</p>

          <Link to="/competencias"><button className="blue-btn">Começar</button></Link>

        </div>

        <div className="home-block">
          <h1 className="home-block-title">
            Acompanhe as <span className="white">proposições</span><span className="blue">.</span>
          </h1>
          <p className="home-block-subtitle">Entenda o que os representantes públicos estão querendo fazer pelo país e como estão votando.</p>

          <div className="proposition-cards-wrapper">
            {this.state.propositions.map((d, i) => (
              <PropositionCard key={d.id} position={i} {...d}/>
            ))}
          </div>
        </div>


      </div>
    );
  }
}
