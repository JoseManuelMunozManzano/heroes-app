import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = ({ history }) => {
  // Extraer los argumentos del url
  // Se puede hacer de varias formas. Por ejemplo, en el Chrome Developer Tools,
  // pestaña Components de React, si vamos al final del todo a HeroScreen, a la derecha
  // veremos en props el match y el location.
  // En match, params podemos ver el heroeid
  // En location, el el pathname también puede verse.
  // Y otra forma, la que se va a hacer aquí, es usando un custom hook de React Router Dom
  // llamado useParams. Este hook va a extraer los parámetros que vayan por el URL.
  // Si hay más de un segmento se reciben como un objeto
  const { heroeId } = useParams();

  // pequeña optimización usando useMemo
  //const hero = getHeroById(heroeId);
  const hero = useMemo(() => getHeroById(heroeId), [heroeId]);

  // Para las pruebas. Ver test/components/heroes/HeroScreen.test.js
  // Se comprueba si vale undefined (falta añadir el Route) o tiene valor
  // console.log('Hero: ', hero, 'HeroId:', heroeId);

  // El heroe puede no existir si se toca la url
  // Ejemplo: http://localhost:3000/hero/marvel-spiderdfdfsdfsdfsd
  // Una buena práctica es redireccionar a la página principal (/marvel en este caso)
  if (!hero) {
    return <Redirect to="/" />;
  }

  const handleReturn = () => {
    // Si accedo con un url directo, copiado de otro navegador y pulso el botón, no hay
    // atrás, saldría.
    // Entonces, si no tengo historial de navegación en mi app, que vuelva a /
    if (history.length <= 2) {
      history.push('/');
    } else {
      history.goBack();
    }
  };

  const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
  } = hero;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`../assets/heroes/${heroeId}.jpg`}
          alt={superhero}
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>

      <div className="col-8 animate__animated animate__fadeIn">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: </b>
            {alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b>
            {publisher}
          </li>
          <li className="list-group-item">
            <b>First appearance: </b>
            {first_appearance}
          </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{characters}</p>

        <button className="btn btn-outline-info" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>
  );
};
