// @flow

import * as React from 'react';
import logo from './logo.svg';
import AppInfo from './components/AppInfo';
import DataContainer from './components/DataContainer'
import './App.css';

class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Flow JS presentation</h1>
        </header>
        <AppInfo info="This is a simple application with an example of usage Flow JS static type checker in React app" />
        <DataContainer url="http://fake-url"/>
      </div>
    );
  }
}

export default App;
