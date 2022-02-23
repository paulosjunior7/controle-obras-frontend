import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://localhost:5001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlOWYwODc5NDA5MWY0YjY5YjRjNTJlZTE5NWJmZjc2MCIsInN1YiI6IlBBVUxPIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJiMGFiYjM1MC0yODE4LTRjNzUtOWYwYy04YWJiZGM0NGZmNzIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY0MjEyMjI3MiwiaXNzIjoiWW91cklzc3Vlck5hbWUiLCJhdWQiOiJodHRwczovL3BlcmZvcm1hbmNlYnVpbGRlci5henVyZXdlYnNpdGVzLm5ldCJ9.ZDq01xQxLE2OefzahOXcqUwyt1Jf97TX9NmemDiyjyM"
    }
  }
});


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);


