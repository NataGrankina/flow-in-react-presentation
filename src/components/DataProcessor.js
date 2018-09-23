// @flow

import * as React from "react";

type TDataProcessor<TDataItem> = $ObjMap<
  TDataItem,
  <TValue, TResult>(TValue) => TValue => TResult
>;

type TExtractReturn = <TValue, TReturn>((TValue) => TReturn) => TReturn;

type TProps<TDataItem> = {
  data: TDataItem[],
  dataProcessor: TDataProcessor<TDataItem>,
  render: (
    data: $ObjMap<TDataProcessor<TDataItem>, TExtractReturn>[]
  ) => React.Node
};

const DataProcessor = <TDataItem: Object>({
  data,
  dataProcessor,
  render
}: TProps<TDataItem>) => {
  const processedData = data.map(item => {
    const keys: $Keys<TDataItem>[] = Object.keys(item);
    return keys.reduce(
      (processedItem, key) => ({
        ...processedItem,
        [key]: dataProcessor[key](item[key])
      }),
      {}
    );
  });

  return render(processedData);
};

export default DataProcessor;
