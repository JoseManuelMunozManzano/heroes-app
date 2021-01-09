import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';
import { AppRouter } from '../../routers/AppRouter';

describe('Pruebas en <AppRouter />', () => {
  // Para emular lo que se le pasa al AuthContext.Provider en HeroesApp.js
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  test('debe de mostrar login si no está autenticado', () => {
    // Recordar: Con Higher Order Component se usa mount
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    // console.log(wrapper.html());

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.container').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Login');
  });

  test('debe de mostrar el componente marvel si está autenticado', () => {
    // No es el objetivo de este archivo router verificar la autenticación. Eso ya se hizo en el Reducer.
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: 'Adriana',
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    // console.log(wrapper.html());

    // Si existe el navbar ya indica que pasó la prueba
    expect(wrapper.find('.navbar').exists()).toBe(true);
  });
});
