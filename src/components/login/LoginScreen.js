import React from 'react';

// Es history porque se puede ver que se llama así en el Chrome Developer Tools, pestaña
// Components de React y pulsando LoginScreen.
// Vemos ahí que React Router nos proporciona varios props, entre ellos este history.
export const LoginScreen = ({ history }) => {
  const handleLogin = () => {
    // En el push pongo la ruta a la que quiero navegar cuando se pulsa click
    //history.push('/');

    // Usando replace, estoy reemplazando en el history que no se visitó el login, sino que
    // es como si llegara directamente al slash
    // Esto sirve para lo siguiente:
    // Estoy en el login, pulso el botón y me redirecciona al slash (recordar que es
    // /marvel). Si ahora pulso el botón retroceder el navegador, no volverá a login puesto
    // que con replace no existe en el history.
    history.replace('/');
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
