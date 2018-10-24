import React from 'react';
import { Mutation } from 'react-apollo';

import _ from 'lodash';

function getDisplayName(mapProps) {
  const props = mapProps({});
  return _.get(props, 'mutation.definitions[0].name.value');
}

export default function withMutation(mapPropsFn, mapResultToPropsFn) {
  const mapProps = mapPropsFn || (() => ({}));
  const mapResultToProps = mapResultToPropsFn || (() => ({}));

  const displayName = getDisplayName(mapProps);
  return WrappedComponent => {
    const component = props => (
      <Mutation displayName={displayName} {...mapProps(props)}>
        {(mutate, result) => {
          const mappedProps = mapResultToProps(mutate, result, props);
          return <WrappedComponent {...props} {...mappedProps} />;
        }}
      </Mutation>
    );

    component.displayName = `withMutation(${displayName})`;
    return component;
  };
}
