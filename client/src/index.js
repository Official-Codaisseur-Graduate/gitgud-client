import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const url = `https://gitgudserver.herokuapp.com/graphql`

const httpLink = {
  uri: url
};

const client = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache()
});


ReactDOM.render(<ApolloProvider client={client}><App/></ApolloProvider>, document.getElementById('root'));

serviceWorker.unregister();
