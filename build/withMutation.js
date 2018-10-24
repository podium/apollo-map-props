import _extends from 'babel-runtime/helpers/extends';
import _get from 'lodash/get';
import React from 'react';
import { Mutation } from 'react-apollo';

function getDisplayName(mapProps) {
  var props = mapProps({});
  return _get(props, 'mutation.definitions[0].name.value');
}

export default function withMutation(mapPropsFn, mapResultToPropsFn) {
  var mapProps = mapPropsFn || function () {
    return {};
  };
  var mapResultToProps = mapResultToPropsFn || function () {
    return {};
  };

  var displayName = getDisplayName(mapProps);
  return function (WrappedComponent) {
    var component = function component(props) {
      return React.createElement(
        Mutation,
        _extends({ displayName: displayName }, mapProps(props)),
        function (mutate, result) {
          var mappedProps = mapResultToProps(mutate, result, props);
          return React.createElement(WrappedComponent, _extends({}, props, mappedProps));
        }
      );
    };

    component.displayName = 'withMutation(' + displayName + ')';
    return component;
  };
}