import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { heroes } from '../../data/heroes';

export const SearchScreen = ({ history }) => {
  // Leyendo el query
  // Ir al Chrome Developer Tools, pestaña Components de React y buscar el componente
  // SearchScreen. Se puede ver el prop location y dentro la key search.
  // De ahí se puede obtener
  // En concreto se obtiene el useLocation
  // NOTAS: Si no hay query aparece con string vacío (search: "")
  //        Si hubiera más de un queyString habríá que parsearlo (?q=Batman&casa=DC)
  //        Como esto es complicado se usa un paquete para trabajar con el queryString.
  //             https://www.npmjs.com/package/query-string
  //        Se usa mucho porque no hay manera directa para hacer esto actualmente.
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);

  // Si refresco el navegador y hay algo escrito en el queryString aparecerá escrito
  // automáticamente en el input
  const [formValues, handleInputChange] = useForm({ searchText: q });
  const { searchText } = formValues;

  const heroesFiltered = heroes;

  const handleSearch = e => {
    e.preventDefault();

    // Se quiere aplicar un filtro por el URL.
    // Cuando el URL cambie se usará un queryString para aplicarlo en la página.
    // Eso me va a mantener el history.
    // Ejemplo de queryString: https://www.npmjs.com/search?q=react
    // La q que aparece tras la interrogación es de query y aparece la información a buscar.
    history.push(`?q=${searchText}`);
  };

  return (
    <div>
      <h1>SearchScreen</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Find your hero"
              className="form-control"
              autoComplete="off"
              name="searchText"
              onChange={handleInputChange}
              value={searchText}
            />

            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
            >
              Search...
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {heroesFiltered.map(hero => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
