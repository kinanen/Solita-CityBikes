import React, { Component } from 'react';
import './custom.css';
import { Home } from './components/Home';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Home></Home>
    );
  }
}
