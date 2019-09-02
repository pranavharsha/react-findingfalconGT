import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorModal from './components/ErrorModal';
import Home from './components/Home';
import SelectPlanets from './components/SelectPlanets';
import SelectVehicles from './components/SelectVehicles';
import FalconeResult from './components/FalconeResult';

library.add(faChevronLeft)

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <ErrorModal />
          <div className="ComponentDiv" style={{ minHeight: window.innerHeight*0.8 + 'px' }}>
            <Switch>
              <Route exact path="/" component={(Home)} />
              <Route exact path="/home" component={(Home)} />
              <Route exact path="/selectplanets" component={(SelectPlanets)} />
              <Route exact path="/selectvehicles" component={(SelectVehicles)} />
              <Route exact path="/falconeresult" component={(FalconeResult)} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
