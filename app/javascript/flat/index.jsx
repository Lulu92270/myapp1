import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/Home';
import FlatCreate from './components/FlatCreate';
import FlatShow from './components/FlatShow';
import FlatUpdate from './components/FlatUpdate';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const root = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/flats/new" component={FlatCreate} />
        <Route path="/flats/:id" exact component={FlatShow} />
        <Route path="/flats/update/:id" component={FlatUpdate} />
      </Switch>
    </Router>
  </React.StrictMode>,
  root
);
