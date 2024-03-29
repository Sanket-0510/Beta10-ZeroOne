import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import "./btnstls.css";
import HomePage from './components/HomePage';
import Login from './components/Login';
import MainPage from './components/ResultPage/MainPage';
import Modal from './components/Modal';
import PredMain from './components/predict/PredMain';
const appname = "FarmEasy";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/MainSearchPage' element={<MainPage />} />
        <Route path='/Predict' element={<PredMain/>} />
      </Routes>
    </div>
  );
}

export default App;
