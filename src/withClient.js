import React from 'react';
import { ApolloConsumer } from 'react-apollo';

export default function withClient(mapClientToProps) {
  return WrappedComponent => {
    const component = props => (
      <ApolloConsumer>
        {client => {
          const mappedProps = mapClientToProps(client, props);
          return <WrappedComponent {...props} {...mappedProps} />;
        }}
      </ApolloConsumer>
    );

    component.displayName = `withClient(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;
    return React.memo(component);
  };
}
