import './index.css';

import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { toIdValue } from 'apollo-utilities';

import { link } from './graphql/link';
import App from './App';

const dataIdFromObject = obj =>
  obj.__typename && obj.id && `${obj.__typename}__${obj.id}`;

const cache = new InMemoryCache({
  dataIdFromObject,
  cacheRedirects: {
    Query: {
      personById: (q, args) =>
        args.id
          ? toIdValue(dataIdFromObject({ __typename: 'Person', id: args.id }))
          : null,
    },
    Person: {
      activity: (person, args) => {
        const { timeRange } = args;
        if (timeRange === 'today') {
          return person.activityToday;
        }
      },
    },
  },
});

const client = new ApolloClient({ cache, link });

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
