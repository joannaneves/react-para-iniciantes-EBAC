/*
import React, { useState } from 'react'

function App() {
  const [city, setCity] = useState('')
  const [weatherForecast, setWeatherForecast] = useState(null)

  const handleSearch = () => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}current.json?key=${process.env.REACT_APP_KEY}&q=${city}&lang=pt`
    )
      .then(res => {
        if (res.status === 200) {
          return res.json()
        }
      })
      .then(data => {
        console.log(data)
        setWeatherForecast(data)
      })
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <a className="navbar-brand" href="#search">
            Workshop EBAC - Saiba agora se você irá derreter ou passar frio!
          </a>
        </nav>
      </div>

      <main className="container" id="search">
        <div className="jumbotron">
          <h1>Verique agora a previsão do tempo na sua cidade!</h1>
          <p className="lead">
            Digite da sua cidade no campo abaixo o nome da sua cidade em seguida
            clique em pesquisar.
          </p>
          <div className="row mb-4">
            <div class="col-md-6">
              <input
                type="text"
                class="form-control"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-lg btn-primary" onClick={handleSearch}>
            Pesquise agora
          </button>

          {weatherForecast ? (
            <>
              <div className="mt-4 d-flex align-items-center">
                <div className="col-sm-1">
                  <img
                    src={`${weatherForecast.current.condition.icon}`}
                    alt="Weather Icon"
                  />
                </div>
                <div>
                  <h3>
                    Hoje o dia está: {weatherForecast.current.condition.text}
                  </h3>
                  <p className="lead">
                    Temp: {weatherForecast.current.temp_c}&#8451;
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </>
  )
}

export default App
*/

import { useState } from 'react'

function App() {
  const [city, setCity] = useState('')
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const searchForecastWeather = () => {
    setLoading(true)
    fetch(
      `${process.env.REACT_APP_BASE_URL}current.json?key=${process.env.REACT_APP_KEY}&q=${city}&lang=pt`
    )
      .then(handleErrors)
      .then(response => {
        if (response.status === 200) {
          setError(false)
          return response.json()
        }
      })
      .then(data => {
        setWeatherForecast(data)
      })
      .catch(error => {
        return error
      })
    setCity('')
    setLoading(false)
  }

  const handleErrors = response => {
    if (!response.ok) {
      setError(true)
      throw new Error(response.status)
    }
    return response
  }

  const handleCityChange = event => {
    setCity(event.target.value)
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <a className="navbar-brand" href="#search">
            EBAC Weather - Workshop
          </a>
        </nav>

        <main className="container">
          <div className="jumbotron">
            <h1>Verifique agora se você vai pingar de calor ou passar frio!</h1>
            <p className="lead">
              Digite a sua cidade no campo abaixo e em seguida clique em
              "Pesquisar".
            </p>
            <div className="row mb-4">
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={handleCityChange}
                />
              </div>
            </div>
            <button
              className="btn btn-lg btn-primary"
              onClick={searchForecastWeather}
            >
              {loading ? 'Aguarde...' : 'Pesquisar'}
            </button>

            {error ? (
              <div className="mt-4">
                <div className="row">
                  <h3>Ocorreu um erro. Tente novamente</h3>
                </div>
              </div>
            ) : weatherForecast ? (
              <div className="mt-4">
                <div className="row">
                  <h2>Neste momento em {weatherForecast.location.name}</h2>
                </div>
                <div className="row mb-4">
                  <h4>
                    {weatherForecast.location.name},{' '}
                    {weatherForecast.location.region},{' '}
                    {weatherForecast.location.country}
                  </h4>
                </div>
                <div className="d-inline-flex p-2 bd-highlight">
                  <div className="col ml-6">
                    <h2>{weatherForecast.current.temp_c}°C</h2>
                  </div>
                  <div className="col ml-8">
                    <img
                      src={weatherForecast.current.condition.icon}
                      width="65"
                      height="65"
                      alt="Weather Icon"
                    />
                  </div>
                  <div className="col ml-8">
                    <p className="lead">
                      {weatherForecast.current.condition.text}
                    </p>
                  </div>
                </div>
                <div>
                  <p>
                    Velocidade da Ventania: {weatherForecast.current.wind_kph}{' '}
                    Km/h
                  </p>
                  <p>Direção do vento: {weatherForecast.current.wind_dir}</p>
                  <p>Precipitação: {weatherForecast.current.precip_mm}mm</p>
                  <p>Umidade do ar: {weatherForecast.current.humidity}%</p>
                  <p>
                    Sensação Térmica: {weatherForecast.current.feelslike_c}ºC
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </>
  )
}

export default App
