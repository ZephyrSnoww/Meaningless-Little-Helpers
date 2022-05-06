import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import Remote from './Remote/Remote';
import Wordle from './Wordle/Wordle';

function App () {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/wordle' element={<Wordle />} />
          <Route exact path='/remote' element={<Remote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
