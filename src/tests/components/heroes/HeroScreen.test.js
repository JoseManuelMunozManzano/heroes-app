// Estas pruebas son más enredadas de lo que parece.
// Tengo que ser capaz de recibir un argumento si lo informo, pero si no existe entonces
// me iría a otra página
// Si el heroe existe tengo que probar el botón y asegurarme de que existe la información de la
// ficha.
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';

import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en <HeroScreen />', () => {
  const history = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };

  test('debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
    const wrapper = mount(
      // initialEntries es un objeto que vamos a definir con el URL y los argumentos que necesitamos
      // enviarle
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={history} />
      </MemoryRouter>
    );

    expect(wrapper.find('Redirect').exists()).toBe(true);
  });

  test('debe de mostrar un hero si el parámetro existe y se encuentra', () => {
    // Hay que probar que el url sea recibido por nuestro componente y este renderice...
    // Vamos a probar esta url que si regresa un heroe: /hero/marvel-spider
    // Necesito enviar el useParams.
    // Para ello añado un Route y el path que pongo es el mismo que aparece en
    // DashboardRoute.js. El component será nuestro HeroScreen
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route path="/hero/:heroeId" component={HeroScreen}></Route>
      </MemoryRouter>
    );

    // Si existe la clase row indica que encontró el heroe y lo está mostrando
    expect(wrapper.find('.row').exists()).toBe(true);
  });

  test('debe de regresar a la pantalla anterior con PUSH', () => {
    // Si toco el botón de Return se llama a handleReturn, que verifica si el history.length <= 2 y
    // llama al push() o >2 y llama a goBack()
    const history = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        {/* Cuando se hace () => <HeroScreen />, es decir, como función, se reciben los props
            que les va a mandar el Route al componente HeroScreen. Se pueden borrar en este
            caso porque no se están usando, pero los dejo para indicar que se pasan */}
        <Route
          path="/hero/:heroeId"
          component={props => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    // Disparando el click del botón. En este caso, se debe llamar al push()
    wrapper.find('button').prop('onClick')();

    expect(history.push).toHaveBeenCalledWith('/');
    expect(history.goBack).not.toHaveBeenCalled();
  });

  test('debe de regresar a la pantalla anterior GOBACK', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').simulate('click');

    expect(history.push).toHaveBeenCalledTimes(0);
    expect(history.goBack).toHaveBeenCalled();
  });

  test('debe de llamar el redirect si el hero no existe', () => {
    // Si mandamos llamar al componente con una URL extraño, que no renderice nada y salga.
    // La ruta de prueba será: /hero/marvel-spiderxxxxxxxxxxxxxxx
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spiderxxxxxxxxxxxxxxx']}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    // Cuando se produce el Redirect obtenemos un texto vacío, así que se puede testear lo siguiente
    expect(wrapper.text()).toBe('');
  });
});
