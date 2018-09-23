// @flow

import * as React from 'react';

type Props = {
  info: string
};

class App extends React.Component<Props> {
  render() {
    return (
      <div className="App">
          {this.props.info}
      </div>
    );
  }
}

export default App;
