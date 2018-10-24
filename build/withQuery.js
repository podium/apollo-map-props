import _extends from 'babel-runtime/helpers/extends';
import _get from 'lodash/get';
import React from 'react';
import { Query } from 'react-apollo';


var DEFAULT_FETCH_POLICY = 'cache-and-network';

function getDisplayName(mapProps) {
  var props = mapProps({});
  return _get(props, 'query.definitions[0].name.value');
}

export default function withQuery(mapProps, mapResultToProps) {
  var displayName = getDisplayName(mapProps);

  return function (WrappedComponent) {
    var component = function component(props) {
      return React.createElement(
        Query,
        _extends({ fetchPolicy: DEFAULT_FETCH_POLICY }, mapProps(props)),
        function (result) {
          var mappedProps = mapResultToProps(result, props);
          return React.createElement(WrappedComponent, _extends({}, props, mappedProps));
        }
      );
    };

    component.displayName = 'withQuery(' + displayName + ')';
    return component;
  };
}