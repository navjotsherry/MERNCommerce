import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
      </Router>
    </div>
  );
}

export default App;
