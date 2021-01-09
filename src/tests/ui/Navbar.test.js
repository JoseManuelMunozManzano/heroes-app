// Este test tiene dos cosas interesantes:
// 1. Debe de tener el nombre del usuario que esta actualmente ingresado.
// 2. La funcionalidad del botón, que es la parte complicada. Al pulsarlo:
//    2.1. Dispatch, que no es muy complicado porque se puede extraer del useContext
//    2.2. La parte del custom Hook history.replace(), que si es más complicado. Para resolver este
// problema hay que realizar una configuración adicional que no es tan obvia.

import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { Navbar } from '../../components/ui/Navbar';
import { types } from '../../types/types';

describe('Pruebas en <Navbar />', () => {
  // En este historyMock se establecerán cada una de las propiedades que marquen error al ejecutar la prueba.
  // Esta estrategia sirve para verificar si alguna función que hicimos fue llamada y con qué argumentos se llamó.
  const historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: 'José Manuel',
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  // Cuando se hace algún tipo de mock siempre es bueno limpiarlo.
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('José Manuel');
  });

  test('debe de llamar el logout y usar history', () => {
    // Hago el click al botón
    wrapper.find('button').prop('onClick')();

    // Parte fácil: verificar que se llama al dispatch.
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      payload: {},
      type: types.logout,
    });

    // Parte difícil: el custom Hook useHistory
    // Evaluar que history.replace() se ha llamado.
    // Para ello se ha generado historyMock, que es el que se llama a través del <Router />,
    // que tambien se añade, en este caso al wrapper.
    expect(historyMock.replace).toHaveBeenCalledWith('/login');
  });
});
