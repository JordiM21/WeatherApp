import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState({})
  const [convertCelsius, setConvertCelsius] = useState(0)
  const [isCelsius, setIsCelsius] = useState(true)
  useEffect(() => {
    const success = (pos) => {
      const crd = pos.coords;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=736d329406a50ce69bd837e33f965483`)
          .then(res => {
            setData(res.data)
            setConvertCelsius(Math.floor(res.data.main.temp)-273)
          })
    }
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  const convert = () => {
    if(isCelsius){
      setConvertCelsius((convertCelsius * 9 / 5) + 32 )
      setIsCelsius(false);
    }else{
      setConvertCelsius((convertCelsius -32) *5 / 9)
      setIsCelsius(true);
    }
  }
  

  let temp = `${data.main?.temp}`
  temp = Math.floor(temp-273.15);
  let timeZone = `${data.timezone}`
  timeZone = timeZone/3600;

  return (
    <div className='App'>
      <h1>Weather App</h1>
      <div className="card">
      <h2>Your city: {data.name}, {data.sys?.country}</h2>
      <h4>Timezone: {timeZone} UTC</h4>
      <div className='d-flex'>
        <img className='icon' src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="" />
          <div className='d-block temp'>
              <h3>{data.weather?.[0].description}</h3>
              <h3>{convertCelsius}{isCelsius ? "°C":"°F"}</h3>
          </div>
        </div>
      <div className='row'>
        <div className='col-6'><h6>Pressure: {data.main?.pressure} hPa</h6></div>
        <div className='col-6'><h6>Humidity: {data.main?.humidity} %</h6></div>
      </div>
    <button onClick={convert} className='btn btn-primary button'>C° / F°</button>
    </div>
    </div>
  )
}

export default App
