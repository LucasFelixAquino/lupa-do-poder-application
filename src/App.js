import logo from './logo.svg';
import './static/App.css';
import Main from './components/Main.react';
import Navbar from './components/Navbar.react';
import Footer from './components/Footer.react';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
