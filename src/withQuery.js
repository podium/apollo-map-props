import React from "react";
import { Query } from "@apollo/client/react/components";
import get from "./get";

let config = { fetchPolicy: "cache-and-network" };

function getDisplayName(mapProps) {
  const props = mapProps({});
  return get(props, "query", "definitions", 0, "name", "value");
}

export default function withQuery(mapProps, mapResultToProps) {
  const displayName = getDisplayName(mapProps);

  return (WrappedComponent) => {
    const component = (props) => (
      <Query fetchPolicy={config.fetchPolicy} {...mapProps(props)}>
        {(result) => {
          const mappedProps = mapResultToProps(result, props);
          return <WrappedComponent {...props} {...mappedProps} />;
        }}
      </Query>
    );

    component.displayName = `withQuery(${displayName})`;
    return React.memo(component);
  };
}

withQuery.setConfig = (newConfig) => {
  config = { ...config, ...newConfig };
};
