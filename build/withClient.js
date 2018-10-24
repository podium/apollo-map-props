import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import { ApolloConsumer } from 'react-apollo';

export default function withClient(mapClientToProps) {
  return function (WrappedComponent) {
    var component = function component(props) {
      return React.createElement(
        ApolloConsumer,
        null,
        function (client) {
          var mappedProps = mapClientToProps(client, props);
          return React.createElement(WrappedComponent, _extends({}, props, mappedProps));
        }
      );
    };

    component.displayName = 'withClient(' + WrappedComponent.displayName + ')';
    return component;
  };
}