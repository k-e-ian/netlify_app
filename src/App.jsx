import "./App.css";
import Portfolio from "./components/Portfolio";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Interact from "./components/Interact";
import Tenzies from "./components/Tenzies";

function App() {
  return (
    <>
      <Header />
      <div className='main-container'>
        <div className='content'>
          <Interact />
        </div>
        <Tenzies />
        <div className='portfolio'>
          <Portfolio />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
