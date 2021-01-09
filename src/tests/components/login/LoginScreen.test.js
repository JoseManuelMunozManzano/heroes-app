import { mount } from 'enzyme';

import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('Prueban en <LoginScreen />', () => {
  const contextValue = {
    dispatch: jest.fn(),
  };

  const history = {
    replace: jest.fn(),
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <LoginScreen history={history} />
    </AuthContext.Provider>
  );

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de realizar el dispatch y la navegación', () => {
    // No se ejecuta la función, sino que se genera la constante y luego
    // se ejecuta. Esto es porque se va a ejcutar más de una vez en distintas
    // partes de este test
    const handleClick = wrapper.find('button').prop('onClick');
    // localStorage no informado
    handleClick();

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      payload: {
        name: 'José Manuel',
      },
      type: types.login,
    });

    expect(history.replace).toHaveBeenCalled();
    expect(history.replace).toHaveBeenCalledWith('/');

    // Estableciendo un localStorage y volviendo a ejecutar el click
    localStorage.setItem('lastPath', '/dc');
    handleClick();
    expect(history.replace).toHaveBeenCalledWith('/dc');
  });
});
