// Los selectores nos ayudan a filtrar la información. Esto tendrá mucho más sentido
// cuando estemos trabajando en la parte de Redux.
import { heroes } from '../data/heroes';

export const getHeroById = id => {
  return heroes.find(hero => hero.id === id);
};
