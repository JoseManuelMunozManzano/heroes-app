import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { PrivateRoute } from '../../routers/PrivateRoute';

describe('Pruebas en <PrivateRoute />', () => {
  const props = {
    location: {
      pathname: '/marvel',
    },
  };

  // No es nuestra tarea probar que físicamente se grabe en localstorage.
  // Sobreescribimos la funcionalidad del setItem del localStorage. En lugar de ser la función que físicamente
  // lo graba, ahora es una función JEST.
  // Como el setItem es algo propio del navegador web, bastaría con que nos aseguremos que sea llamado con los
  // argumentos necesarios para que sea guardado.
  Storage.prototype.setItem = jest.fn();

  test('debe de mostrar el componente si está autenticado y guardar localStorage', () => {
    // isAuthenticated lo paso como true, me lo invento.
    // Pero si ejecuto la prueba y luego lo paso a false falla la prueba, porque ya no estaríá autenticado
    // y <PrivateRoute /> evalua si esta autenticado y si lo está entonces vamos a ver el componente que se le
    // manda como argumento. Si no está autenticado <PrivateRoute /> ejecuta un <Redirect />
    // En el caso false, vemos que console.log(wrapper.html()) no renderiza nada, <Redirect /> es un string vacío.
    //
    // El componente me lo puedo inventar, pero en este caso debo mandarlo como función
    //
    // Para evitar el error de rest.location.pathname of undefined genero esa propiedad arriba en la constante props
    // const wrapper = shallow(
    const wrapper = mount(
      // <MemoryRouter /> es otro higher order component que se usa para poder realizar pruebas de router con ciertas
      // rutas. Esto facilita que se pueda falsear la información de diferentes rutas en donde me encuentro para poderlas
      // evaluar
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Listo</span>}
          {...props}
        />
      </MemoryRouter>
    );

    // Si no se envuelve <PrivateRoute /> en el <MemoryRouter />
    // aqui da el error: Invariant failed: You should not use <Route> outside a <Router>
    console.log('==========' + wrapper.html() + '==========');

    // Esto falla porque:
    // Si hay un higher order component en la prueba no se puede usar shallow, porque shallow sólo va a renderizar el
    // componente (el higher order component) y no va a renderizar lo de adentro.
    // En el console.log(wrapper.html()) si se ve el span porque el método html() si renderiza todo lo demás.
    // Por eso arriba se cambia el shallow() por mount()
    // Usando mount() el wrapper si tiene internamente toda la estructura que estamos esperando.
    expect(wrapper.find('span').exists()).toBe(true);

    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
  });
});
