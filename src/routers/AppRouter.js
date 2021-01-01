// El nombre AppRouter es una convención para indicar que es el sistema de routers principal
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar } from '../components/ui/Navbar';
import { LoginScreen } from '../components/login/LoginScreen';
import { MarvelScreen } from '../components/marvel/MarvelScreen';

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <Switch>
          {/* En el login habrá un diseño (template) diferente, sin el navbar, 
          a cuando el usuario se autentica. Por ahora la autenticación es ficticia */}
          <Route exact path="/login" component={LoginScreen} />

          <Route exact path="/" component={MarvelScreen} />
        </Switch>
      </div>
    </Router>
  );
};
