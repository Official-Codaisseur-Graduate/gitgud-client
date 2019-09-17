import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const url = `https://gitgud-server.herokuapp.com/graphql`
// const url = `http://localhost:3030/graphql`

const httpLink = {
  uri: url,
  headers: {
    authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
      }`,
  }
};

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only'
  },
  query: {
    fetchPolicy: 'network-only'
  },
}

const client = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

class Base extends React.Component {
  render() {
    return (
      <BrowserRouter><ApolloProvider client={client}><App /></ApolloProvider></BrowserRouter>
    )
  }
}

ReactDOM.render(<Base />, document.getElementById('root'));
