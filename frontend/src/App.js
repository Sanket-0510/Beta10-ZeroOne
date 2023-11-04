import './App.css';
import BottomSection from './components/BottomSection/Section';
import Navbar from './components/Navbar';
import TopSection from './components/TopSection/Section';
import "./btnstls.css";
const appname = "FarmEasy";

function App() {

  return (

    <div className="App">
      <Navbar title = {appname}/>
      <TopSection/>
      <BottomSection/>
    </div>
  );
}

export default App;
