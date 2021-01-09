// Estas pruebas son más enredadas de lo que parece.
// Tengo que ser capaz de recibir un argumento si lo informo, pero si no existe entonces
// me iría a otra página
// Si el heroe existe tengo que probar el botón y asegurarme de que existe la información de la
// ficha.
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en <HeroScreen />', () => {
  const history = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };

  const wrapper = mount(
    // initialEntries es un objeto que vamos a definir con el URL y los argumentos que necesitamos
    // enviarle
    <MemoryRouter initialEntries={['/hero']}>
      <HeroScreen history={history} />
    </MemoryRouter>
  );

  test('debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
    expect(wrapper.find('Redirect').exists()).toBe(true);
  });
});
