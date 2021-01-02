import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {
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

  const hero = getHeroById(heroeId);

  // El heroe puede no existir si se toca la url
  // Ejemplo: http://localhost:3000/hero/marvel-spiderdfdfsdfsdfsd
  // Una buena práctica es redireccionar a la página principal (/marvel en este caso)
  if (!hero) {
    return <Redirect to="/" />;
  }

  const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
  } = hero;

  return (
    <div>
      <h1>Hero Screen</h1>
    </div>
  );
};
