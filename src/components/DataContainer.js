// @flow

import * as React from "react";
import DataProcessor from "./DataProcessor";

type Props = {
  url: string
};

type DataItem = {
  field1: string,
  field2: number,
  field3: ?boolean
};

type InitialState = {
  status: "initial"
};

type LoadingState = {
  status: "loading"
};

type LoadedState = {
  status: "loaded",
  response: DataItem[]
};

type ErrorState = {
  status: "error",
  error: Error
};

type State = {
  asyncState: InitialState | LoadingState | LoadedState | ErrorState
};

const loadData = (url: string): Promise<DataItem[]> =>
  new Promise(resolve => {
    resolve([
      {
        field1: "value 1",
        field2: 2,
        field3: true
      }
    ]);
  });

class DataContainer extends React.Component<Props, State> {
  state = {
    // https://github.com/facebook/flow/issues/3341
    asyncState: {
      status: "initial"
    }
  };

  async componentDidMount() {
    this.setState({
      asyncState: {
        status: "loading"
      }
    });

    try {
      const data = await loadData(this.props.url);

      this.setState({
        asyncState: {
          status: "loaded",
          response: data
        }
      });
    } catch (error) {
      this.setState({
        asyncState: {
          status: "error",
          error
        }
      });
    }
  }

  render() {
    const { asyncState } = this.state;

    // if (asyncState.response.length) { // Error!
    if (asyncState.status === "loaded") {

      const dataProcessor = {
        field1: value => value,
        field2: value => value.toString(),
        field3: value => !value
      };

      return (
        <div>
          <span>Data loaded: </span>
          <DataProcessor
            data={asyncState.response}
            dataProcessor={dataProcessor}
            render={data =>
              (<div>
                {
                  data.map(item => `${item.field1} ${item.field2.toFixed()} ${item.field3.toString()} ${item.field4}`)
                  // data.map(item => `${item.field1} ${item.field2} ${item.field3.toString()}`)
                }
              </div>)
            }
          />
        </div>
      );
    }

    return <div />;
  }
}

export default DataContainer;
