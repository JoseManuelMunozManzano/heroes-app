import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';
import { demoAuthLogged, demoAuthLogout } from '../fixtures/demoAuth';

describe('Pruebas en authReducer', () => {
  test('debe de retornar el estado por defecto', () => {
    const state = authReducer(demoAuthLogged, {});

    expect(state).toEqual(demoAuthLogged);
  });

  test('debe de autenticar y colocar el name del usuario', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'José Manuel',
      },
    };

    const state = authReducer(demoAuthLogout, action);

    expect(state).toEqual(demoAuthLogged);
  });

  test('debe de borrar el name del usuario y logged en false', () => {
    const action = {
      type: types.logout,
    };

    const state = authReducer(demoAuthLogged, action);

    expect(state).toEqual(demoAuthLogout);
  });
});
