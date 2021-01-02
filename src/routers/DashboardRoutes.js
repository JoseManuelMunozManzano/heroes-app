// Para crear rutas hijas creamos este functional component que va a tener rutas.
// No va a tener un <Router> propiamente dicho, pero lo que va dentro del Router si.
// Esa es la única diferencia entre rutas hijas y el padre AppRouter.
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Navbar } from '../components/ui/Navbar';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { HeroScreen } from '../components/heroes/HeroScreen';
import { DcScreen } from '../components/dc/DcScreen';
import { SearchScreen } from '../components/search/SearchScreen';

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />

      <div className="container mt-2">
        <Switch>
          <Route exact path="/marvel" component={MarvelScreen} />
          <Route exact path="/hero/:heroeId" component={HeroScreen} />
          <Route exact path="/dc" component={DcScreen} />
          <Route exact path="/search" component={SearchScreen} />

          {/* Si la ruta no es alguna de las de arriba redirecciona a /marvel.
              Este Redirect puede usarse para validaciones también */}
          <Redirect to="/marvel" />
        </Switch>
      </div>
    </>
  );
};
