import './App.css';
import React, {useState, useEffect} from 'react';
import {getWeatherData} from './data/weatherapi';
import {ScaleLoader} from 'react-spinners'; 

function App() {
  const [weatherdata, setWeatherData] = useState(null);
  const [city, setCity] = useState('Campo Grande');
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try{
      setLoading(true);      
      const data = await getWeatherData(city);
      setWeatherData(data);
      //console.log(data);
      setLoading(false);
    }catch(error){
      console.log(error.message);
      setLoading(false);
    }
  }

  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
  `;

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="card">
          <div className="panel2">
            <table>
              <tr>
              <th>Posição</th>
              <th>Cidade</th>
              </tr>
              <tr>
              <td>1°</td>
              <td>Campo Grande</td>
              </tr>
              <tr>
              <td>2°</td>
              <td>São Paulo</td>
              </tr>
              <tr>
              <td>3°</td>
              <td>Rio de Janeiro</td>
              </tr>
              <tr>
              <td>4°</td>
              <td>Londres</td>
              </tr>
              <tr>
              <td>5°</td>
              <td>Milão</td>
              </tr>
            </table>
          </div>
        <div className="panel1">
          <h2 className="title"><i className="fas fa-cloud-sun-rain">App Weather</i></h2>
          <div className="search-form">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Digite o nome da cidade"/>
            <button type="button" onClick={() => getData()}><i className="fa fa-search"></i></button>
          </div>
          {loading ? (
            <div className="loader-container">
              <ScaleLoader
                css={override}
                size={200}
                color= {"#fff"}
                loading= {loading}
              />
            </div>
          ) : (
            <>
            {weatherdata !== null ? (
            <div className="main-container">
            <h4>Previsão em tempo real</h4>
            <div className="weather-icon">
              <img src={`http://api.openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`} alt="imgicon"/>
            </div>
            <h3>{weatherdata.weather[0].main}</h3>
            <div className="temprature">
              <h1>{parseFloat(weatherdata.main.temp - 273.15).toFixed(1)}&deg;C</h1>
            </div>
            <div className="location">
              <h3><i className="fa fa-street-view"></i>{weatherdata.name} | {weatherdata.sys.country}</h3>
            </div>
            <div className="temperature-range">
              <h6>Min: {parseFloat(weatherdata.main.temp_min - 273.15).toFixed(1)}&deg;C || Max: {parseFloat(weatherdata.main.temp_max - 273.15).toFixed(1)}&deg;C || Umidade:{weatherdata.main.humidity}%</h6>
            </div>
          </div>
          ) : null}        
            </>
          )}        
        </div>
      </div>
    </div>
  );
}

export default App;
