// El nombre AppRouter es una convención para indicar que es el sistema de routers principal
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {
  return (
    <Router>
      {/* Si se quisiera un estilo global para toda la aplicación se puede colocar 
      dentro del div */}
      <div>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />

          {/* Se elimina el exact ya que redireccionamos a /marvel, por lo que nunca
          va a valer exactamente el valor / */}
          <Route path="/" component={DashboardRoutes} />
        </Switch>
      </div>
    </Router>
  );
};
