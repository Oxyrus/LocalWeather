import React, { Component } from 'react';

import Weather from './Weather';

export default class App extends Component {
  render() {
    return (
      <div>
        <Weather />
        <footer>Crafted with &hearts; by <a href="https://github.com/Oxyrus" target="_blank">Andrés Pérez</a></footer>
      </div>
    );
  }
}
