import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const Client = require('pg').Client
const cliente = new client({
  user: "postgres",
  password: "159753",
  host: "127.0.0.1",
  port: 5432,
  database: "ranking"
})

cliente.connect()
cliente.query("SELECT * FROM citiesPosition")
.then(results => {
  const resultado = results.rows
  console.table(resultado)
})

.finally(() => cliente.end())
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
