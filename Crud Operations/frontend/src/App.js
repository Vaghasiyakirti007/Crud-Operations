import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './component/Home';

function App() {
  return (

    <Router>
      <div>

        <Routes>
          <Route exact path='/' element={<Home />}></Route>
        </Routes>
      </div>

    </Router>


  );
}

export default App;
