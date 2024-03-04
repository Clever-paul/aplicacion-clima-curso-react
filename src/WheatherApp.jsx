import { useState } from "react"

export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '54092f5bd5a51d4018a666e40f88a7e6'
    const [ciudad, setCiudad] = useState('')
    const difKelvin = 273.15

    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad= (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        fetchClima()
        if(ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&APPID=${API_KEY}`) //con este response estamos haciendo la peticion
            //y ahora tenemos que convertirla a json para que javascript  lo pueda entender
            const data = await response.json()
            setDataClima(data)
        }catch(error){
            console.error(' ocurrio el siguiente problema', error)
        }
    }
  return (
    <div className="container">
        <h1>Aplicacion de Clima</h1> 

        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={ciudad}
            onChange={handleCambioCiudad} 
            />  
            <button type="submit">Buscar</button>  
        </form>  
        {
            dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                    <p>Condicion Meteorologica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima?.weather[0].icon}@2x.png`} alt="" />
                </div>
            )
        } 
    </div>
  )
}
