import React, { useMemo } from 'react';

import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {
  // Pequeña optimización usando useMemo
  // Si hago cualquier cosa en el componente y se cambia el state, se va a volver a disparar
  // el procedimiento para obtener los heroes, en concreto, en HeroList se volvería a
  // disparar getHeroesByPublisher(publisher)
  // Y esto es algo que no queremos que se vuelva a disparar.
  // Sólo debería de volver a dispararse si cambia el publisher.
  // Este es un excelente ejemplo para usar el useMemo.
  // Esto no significa que haya que usar el useMemo en todos lados, pero si el proceso es
  // pesado  y se nota una depreciación cada vez que hacen algún cambio en el componente y
  // se vuelve a  generar este valor, entonces ahí sí podría pensarse en usar useMemo.
  //
  //const heroes = getHeroesByPublisher(publisher);

  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className="card-columns animate__animated animate__fadeIn">
      {heroes.map(hero => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};
