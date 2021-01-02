// Los selectores nos ayudan a filtrar la información. Esto tendrá mucho más sentido
// cuando estemos trabajando en la parte de Redux.

import { heroes } from '../data/heroes';

export const getHeroesByPublisher = publisher => {
  // Buena práctica. Lanzar un error si el publisher es incorrecto.
  // Se nos debe pasar un publisher correcto.
  const validPublishers = ['DC Comics', 'Marvel Comics'];

  if (!validPublishers.includes(publisher)) {
    throw new Error(`Publisher "${publisher}" no es correcto.`);
  }

  return heroes.filter(hero => hero.publisher === publisher);
};
