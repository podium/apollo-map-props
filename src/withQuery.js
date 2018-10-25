import React from 'react';
import { Query } from 'react-apollo';
import get from './get';

const DEFAULT_FETCH_POLICY = 'cache-and-network';

function getDisplayName(mapProps) {
  const props = mapProps({});
  return get(props, 'query', 'definitions', 0, 'name', 'value');
}

export default function withQuery(mapProps, mapResultToProps) {
  const displayName = getDisplayName(mapProps);

  return WrappedComponent => {
    const component = props => (
      <Query fetchPolicy={DEFAULT_FETCH_POLICY} {...mapProps(props)}>
        {result => {
          const mappedProps = mapResultToProps(result, props);
          return <WrappedComponent {...props} {...mappedProps} />;
        }}
      </Query>
    );

    component.displayName = `withQuery(${displayName})`;
    return component;
  };
}
