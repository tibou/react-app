import React from 'react';
// On importe le CSS
import './App.css';
// On importe bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
/* Importer pour informer notre App de l'existence de redux */
import { Provider } from "react-redux";
// On importe le sotore
import store from "./store";

//Importer pour créer les routes
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ProjectBoard from "./components/ProjectBoard";
import Navbar from "./components/Navbar";
import AddProjectTask from './components/ProjectTask/AddProjectTask';
import UpdateProjectTask from './components/ProjectTask/UpdateProjectTask';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />

          <Route exact path="/" component={ProjectBoard} />

          {/* Création d'une route */}
          <Route exact path="/addProjectTask" component={AddProjectTask} />

          <Route exact path="/updateProjectTask/:pt_id" component={UpdateProjectTask} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
