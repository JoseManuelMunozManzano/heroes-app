// El nombre AppRouter es una convención para indicar que es el sistema de routers principal
import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { AuthContext } from '../auth/AuthContext';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Router>
      {/* Si se quisiera un estilo global para toda la aplicación se puede colocar 
      dentro del div */}
      <div>
        <Switch>
          {/* Se deja pública esta ruta */}
          <PublicRoute
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={user.logged}
          />

          {/* Se elimina el exact ya que redireccionamos a /marvel, por lo que nunca
          va a valer exactamente el valor / */}
          {/* Se va a proteger esta ruta ya que todas nuestras rutas privadas pasarán 
          por aquí. Se pasa PrivateRoute en vez de Route */}
          <PrivateRoute
            path="/"
            component={DashboardRoutes}
            isAuthenticated={user.logged}
          />
        </Switch>
      </div>
    </Router>
  );
};
