import './App.css';
import { useEffect, useState } from 'react';
import search_icon from './icon/search.png';

const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const API_Key = `e8bb29d89e7371ed7e29fda2f9759167`;

function App() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [showCurrentLocation, setShowCurrentLocation] = useState(false);
    const [currentWeatherData, setCurrentWeatherData] = useState();
    const [cityWeatherData, setCityWeatherData] = useState();
    const [InputCityname, setInputCityName] = useState('');
    const [cityname, setCityName] = useState('');

    // Current Location ?

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        })
        if (showCurrentLocation === true) {
            const urlLatLonAsQuery = `${API_endpoint}lat=${latitude}&lon=${longitude}&appid=${API_Key}`;
            fetch(urlLatLonAsQuery)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setCurrentWeatherData(data)

                })
        }
    }, [latitude, longitude, showCurrentLocation])
    console.log("Current Location Weather Data fetched!", currentWeatherData)

    // location for city name input

    useEffect(() => {
        const urlCityAsQuery = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_Key}`
        fetch(urlCityAsQuery)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setCityWeatherData(data)


            })
    }, [cityname]);
    console.log(`Weather Data of ${cityname} fetched!`, cityWeatherData)

    return (
        <>
            <nav>
                <h1>WeatherNow</h1>
            </nav>
            <div className='container'>

                <table className='tableRecord'>
                    <thead>
                        <th>Your Current Location's Coordinates</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Latitude </td>
                            <td>{latitude}</td>
                        </tr>

                        <tr>
                            <td>Longitude </td>
                            <td>{longitude}</td>
                        </tr>
                    </tbody>

                    <tr>
                        <td>Wanna know the weather status for your Current Location?</td>
                        <button className="BtnLight" type='submit' onClick={() => setShowCurrentLocation(true)}>Show Weather Status <img src={search_icon} alt='search' width='30px' /></button>
                    </tr>

                </table>
                {
                    showCurrentLocation === true && currentWeatherData !== undefined && (
                        <>

                            <div className='Card DisplayCard'>
                                <h3>Latitude: {currentWeatherData.coord.lat}</h3>
                                <h3>Longitude: {currentWeatherData.coord.lon}</h3>
                                <h3>Name: {currentWeatherData.name}</h3>
                                <button type='submit' className='closeBtn' onClick={() => { setShowCurrentLocation(!showCurrentLocation) }}>CLOSE</button>
                            </div>
                        </>
                    )
                }


                <div className='Card'>
                    <label>Enter the City Name: </label>
                    <input placeholder='City Name' value={InputCityname} onChange={(e) => {
                        e.preventDefault();
                        setInputCityName(e.target.value)
                    }} />
                    <button type='submit' className='BtnLight' style={{ display: "inline" }} onClick={() => setCityName(InputCityname)}>Find</button>
                </div>
                {/* render Design */}
                {
                    cityWeatherData !== null && cityWeatherData !== undefined && cityWeatherData.cod !== '400' && cityWeatherData.coord.lat !== undefined && cityWeatherData.coord.lon !== undefined && (
                        <div className='Card DisplayCard' style={{ backgroundColor: " #b3df62" }}>
                            <h3>Latitude: {cityWeatherData.coord.lat}</h3>
                            <h3>Longitude: {cityWeatherData.coord.lon}</h3>
                            <h3>Name: {cityWeatherData.name}</h3>
                            <button type='submit' className='closeBtn' onClick={() => { setCityWeatherData(null) }}>CLOSE</button>
                        </div>
                    )
                }

            </div>

        </>
    );
}

export default App;