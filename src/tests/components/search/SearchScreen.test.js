import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';

import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchScreen />', () => {
  test('debe de mostrarse correctamente con valores por defecto', () => {
    // En Route path indico en que path estoy, así que en el MemoryRouter
    // le indico en initialEntries esa path también
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
  });

  test('debe de mostrar a Batman y el input con el valor del queryString', () => {
    // Vamos a simular qe estamos en la ruta /search?q=batman y asegurarnos que en la caja
    // de texto tenga el valor batman.

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('input').prop('value').trim()).toBe('batman');
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de mostrar un error si no se encuentra el Hero', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batmNOEXISTE']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('.alert-danger').exists()).toBe(true);
    expect(wrapper.find('.alert-danger').text().trim()).toBe(
      'There is no hero with batmNOEXISTE'
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de llamar el push del history', () => {
    // Cuando se presione Enter en el formulario se manda la información de la
    // caja de texto al URL
    const history = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route
          path="/search"
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );

    // Se introduce el valor en la caja de texto
    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchText',
        value: 'batman',
      },
    });

    // Submit del formulario
    wrapper.find('form').prop('onSubmit')({
      preventDefault() {},
    });

    expect(history.push).toHaveBeenCalledWith('?q=batman');
  });
});
