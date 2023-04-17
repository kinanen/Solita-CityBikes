import React, { Component } from 'react';
import LeafletMap from './LeafletMap';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        HELLO
        <LeafletMap></LeafletMap>
      </div>
    );
  }
}
