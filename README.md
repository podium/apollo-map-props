# apollo-map-props

We created three Higher Order Component (HOC) that wraps the Apollo [Query](https://www.apollographql.com/docs/react/api/react-apollo.html#query) and [Mutation](https://www.apollographql.com/docs/react/api/react-apollo.html#mutation) and
[Context](https://www.apollographql.com/docs/react/react-apollo-migration.html#context) component

## Installation
install this package by running `npm install apollo-map-props --save`

## Usage

### withQuery

A HOC that encapsulate the `Query` apollo component and explicitly define two functions that will handle the query props and the result mapping to the Wrapped component.

#### Args
* mapProps - takes the incoming props and maps it onto the `Query`. This is where you'll put on `query`, `variables`, `skip`, `fetchPolicy`, and [anything else like that](https://www.apollographql.com/docs/react/essentials/queries.html#props).
* mapResultToProps - takes the [result](https://www.apollographql.com/docs/react/essentials/queries.html#render-prop) and props then maps them to the props the `View` component will expect.

**Example**
```javascript
import { withQuery } from 'apollo-map-props';
import query from 'apollo/queries/locationsQuery';

const mapProps = ({ locationId }) => ({
  query,
  variables: { locationId },
  skip: !locationId
});

const mapResultToProps = ({ data, loading }, _props) => ({
  locations: _.get(data, 'locationsAll'),
  isFetchingLocations: loading
});

const View = withQuery(mapProps, mapResultToProps)(ConversationPageView);
```

### withMutation

A HOC that encapsulate the `Mutation` apollo component and explicitly define two functions that will handle the mutation props and the result mapping to the Wrapped component.

#### Args
* mapProps - takes the incoming props and maps it onto the `Mutation`. Generally you'll just be passing the `mutation`, and passing the rest manually to the `mutate` function, but you can pass [anything `Mutation` takes](https://www.apollographql.com/docs/react/essentials/mutations.html#props).
* mapResultToProps - takes the [mutate, result,](https://www.apollographql.com/docs/react/essentials/mutations.html#render-prop) and props then maps it to the props the `View` component will expect.

**Example**
```javascript
import { withMutation } from 'apollo-map-props';
import mutation from 'apollo/mutations/markAsReadMutation';

const mapProps = ({ conversationId }) => ({
  mutation,
  variables: { id: conversationId },
  optimisticResponse: {
    __typename: 'Mutation',
    conversationUpdate: { __typename: 'Conversation', id: conversationId, read: true }
  }
});

const mapResultToProps = (mutate, _result, _props) => ({ markAsRead: mutate });

const View = withMutation(mapProps, mapResultToProps)(ConversationView);
```

**More complicated example**
```javascript
import mutation from 'apollo/mutations/createMessageMutation';

const mapProps = () => ({ mutation });

function mapResultToProps(mutate, { client }, props) {
  const createMessage = attrs => {
    const optimisticResponse = createMessageOptimisticResponse({
      ...attrs,
      userId: props.currentUser.id,
      attachments: []
    });

    // Update the conversation in the cache so it has the new message
    updateConversationCache(client, props, (conversation, items) => {
      const message = optimisticResponse.message;
      conversation.lastItem = message;
      const conversationItems = [...items, message];
      return { conversation, conversationItems };
    });

    mutate({ variables: attrs, optimisticResponse })
      .then(props.refetchConversations)
      .catch(result => {
        // Remove the new message from the cached conversation since it failed
        updateConversationCache(client, props, (conversation, items) => {
          const message = optimisticResponse.message;
          const conversationItems = _.reject(items, { id: message.id });
          conversation.lastItem = _.last(conversationItems);
          return { conversation, conversationItems };
        });
      });
  };
  return { createMessage };
}

const View = withCreateMessageMutation(mapProps, mapResultToProps)(ConversationView);
```
