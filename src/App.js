import './App.css';
import { useEffect, useState } from 'react';

import search_icon from './icon/search.png';
// import cloud_icon from './icon/cloud.png';
// import clear_icon from './icon/clear.png';
// import cloudy_icon from './icon/cloudy.png';
// import rain_icon from './icon/rain.png';
import humidity_icon from './icon/humidity.png';
// import snow_icon from './icon/snow.png';
// import thunder_icon from './icon/thunder.png';
// import drizzle_icon from './icon/drizzle.png';
import wind_icon from './icon/wind-speed.png';
import windDegree from './icon/windDegree.png';
import air from './icon/air.png'
import airPressure from './icon/airPressure.png'
import location from './icon/location.png'
import locationPin from './icon/google-maps.png'
import latitudeIcon from './icon/latitude1.png'
import longitudeIcon from './icon/longitude1.png'

import weather01d from './weatherIcon/weather01d.png';
import weather01n from './weatherIcon/weather01n.png';
import weather02d from './weatherIcon/weather02d.png';
import weather02n from './weatherIcon/weather02n.png';
import weather03 from './weatherIcon/weather03.png';
import weather04 from './weatherIcon/weather04.png';
import weather09 from './weatherIcon/weather09.png';
import weather10d from './weatherIcon/weather10d.png';
import weather10n from './weatherIcon/weather10n.png';
import weather11d from './weatherIcon/weather11d.png';
import weather11n from './weatherIcon/weather11n.png';
import weather13 from './weatherIcon/weather13.png';
import weather50 from './weatherIcon/weather50.png';

const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const API_Key = `e8bb29d89e7371ed7e29fda2f9759167`;
// const weatherIcons = {
//     '01d': weather01d,
//     '01n': weather01n,
//     '02d': weather02d,
//     '02n': weather02n,
//     '03': weather03,
//     '04': weather04,
//     '09': weather09,
//     '10d': weather10d,
//     '10n': weather10n,
//     '11d': weather11d,
//     '11n': weather11n,
//     '13': weather13,
//     '50': weather50,
// };

// const weatherIcons = {
//     '01d': '01d', // clear sky (day)
//     '01n': '01n', // clear sky (night)
//     '02d': '02d', // few clouds (day)
//     '02n': '02n', // few clouds (night)
//     '03d': '03', // scattered clouds (day)
//     '03n': '03', // scattered clouds (night)
//     '04d': '04', // broken clouds (day)
//     '04n': '04', // broken clouds (night)
//     '09d': '09', // shower rain (day)
//     '09n': '09', // shower rain (night)
//     '10d': '10d', // rain (day)
//     '10n': '10n', // rain (night)
//     '11d': '11d', // thunderstorm (day)
//     '11n': '11n', // thunderstorm (night)
//     '13d': '13', // snow (day)
//     '13n': '13', // snow (night)
//     '50d': '50', // mist (day)
//     '50n': '50', // mist (night)
// };

const weatherIcons = {
    '01d': weather01d, // clear sky (day)
    '01n': weather01n, // clear sky (night)
    '02d': weather02d, // few clouds (day)
    '02n': weather02n, // few clouds (night)
    '03d': weather03, // scattered clouds (day)
    '03n': weather03, // scattered clouds (night)
    '04d': weather04, // broken clouds (day)
    '04n': weather04, // broken clouds (night)
    '09d': weather09, // shower rain (day)
    '09n': weather09, // shower rain (night)
    '10d': weather10d, // rain (day)
    '10n': weather10n, // rain (night)
    '11d': weather11d, // thunderstorm (day)
    '11n': weather11n, // thunderstorm (night)
    '13d': weather13, // snow (day)
    '13n': weather13, // snow (night)
    '50d': weather50, // mist (day)
    '50n': weather50, // mist (night)
};

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
            const urlLatLonAsQuery = `${API_endpoint}&units=Metric&lat=${latitude}&lon=${longitude}&appid=${API_Key}`;
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
        const urlCityAsQuery = `${API_endpoint}q=${cityname}&units=Metric&appid=${API_Key}`
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
                <div className='top-bar'>
                    <input type='text' className='cityInput' placeholder='Enter a City Name' value={InputCityname} onChange={(e) => {
                        e.preventDefault();
                        setInputCityName(e.target.value)
                    }} />
                    <button type='submit' className='search-btn' onClick={() => setCityName(InputCityname, (setInputCityName("")))}>
                        <img src={search_icon} alt='search' width='30px' />
                    </button>
                </div>

                {/* render Design */}
                {
                    cityWeatherData !== null && cityWeatherData !== undefined && cityWeatherData.cod === '404' && cityWeatherData.cod !== '400' && cityWeatherData.message === 'city not found' && (
                        <div className='DisplayCard errorCard '>
                            <h2>City not found!<br />Please enter correct city name.</h2>
                        </div>
                    )
                }
                {
                    cityWeatherData !== null && cityWeatherData !== undefined && cityWeatherData.cod !== '400' && cityWeatherData.cod !== '404' && cityWeatherData.coord.lat !== undefined && cityWeatherData.coord.lon !== undefined && (
                        <>

                            {/* <div className='weather-image'>
                                <img width="10%" alt='weather-icon' src={`http://openweathermap.org/img/w/` + cityWeatherData.weather[0].icon + `.png`} />
                            </div> */}

                            {/* image */}
                            {/* Weather Icon */}
                            <div className='weather-image'>

                                <img
                                    width="10%"
                                    alt='weatherImg'
                                    src={weatherIcons[cityWeatherData.weather[0].icon]}

                                />

                            </div>
                            <div className='weather-temp'>
                                {cityWeatherData.main.temp} ℃
                            </div>

                            <div className='weather-location'>
                                <img alt='icon' width='50px' height='50px' src={locationPin} />
                                {cityWeatherData.name}
                            </div>

                            <div className='data-container'>

                                <div className='element'>

                                    <div className='data' style={{ textAlign: 'center' }}>

                                        <img alt='icon' src={latitudeIcon} />

                                        <div className='text'>Latitude</div>
                                        <div className='humidity-percent'> {cityWeatherData.coord.lat}</div>
                                    </div>
                                </div>

                                <div className='element'>


                                    <div className='data' style={{ textAlign: 'center' }}>
                                        <div>
                                            <img alt='icon' src={longitudeIcon} />
                                        </div>
                                        <div className='text'>Longitude</div>
                                        <div className='humidity-percent'> {cityWeatherData.coord.lon}</div>
                                    </div>
                                </div>

                            </div>

                            <div className='data-container'>
                                <div className='element'>
                                    <img className='icon' alt='weather-icon' src={`http://openweathermap.org/img/w/` + cityWeatherData.weather[0].icon + `.png`} />

                                    <div className='data' style={{ fontSize: "2.5rem" }}>
                                        {cityWeatherData.weather[0].description}
                                    </div>
                                </div>
                            </div>

                            <div className='data-container'>
                                <div className='element'>
                                    <img alt='icon' className='icon' src={humidity_icon} />
                                    <div className='data'>
                                        <div className='humidity-percent'>{cityWeatherData.main.humidity} %</div>
                                        <div className='text'>Humidity</div>
                                    </div>
                                </div>

                                <div className='element'>
                                    <img alt='icon' className='icon' src={wind_icon} />
                                    <div className='data'>
                                        <div className='wind-speed'>{cityWeatherData.wind.speed} m/s</div>
                                        <div className='text'>Wind Speed</div>
                                    </div>
                                </div>
                            </div>
                            <div className='data-container'>
                                <div className='element'>
                                    <img alt='icon' className='icon' src={air} />
                                    <div className='data'>
                                        <div className='humidity-percent'>{cityWeatherData.main.pressure} mbar</div>
                                        <div className='text'>Pressure</div>
                                    </div>
                                </div>

                                <div className='element'>
                                    <img alt='icon' className='icon' src={windDegree} />
                                    <div className='data'>
                                        <div className='wind-speed'>{cityWeatherData.wind.deg}°</div>
                                        <div className='text'>Wind Degree</div>
                                    </div>
                                </div>
                            </div>

                            <div className='location-map'>
                                <map>
                                    <h1>google map</h1>
                                </map>
                            </div>
                            <div className='element' style={{ justifyContent: "center" }}>
                                <button type='submit' className='closeBtn light-btn' style={{ background: "white", color: "black" }} onClick={() => { setCityWeatherData(null) }}>CLOSE</button>
                            </div>

                        </>
                    )
                }

                <div className='currentLocation-container'>
                    <div className='tableRecord'>
                        <h3>Your Current Location's Coordinates</h3>
                        {/* <table>

                            <tbody>
                                <tr>
                                <img alt='icon' src={latitudeIcon} />
                                    <td>Latitude </td>
                                    <td>{latitude}</td>
                                </tr>

                                <tr>
                                <img alt='icon' src={longitudeIcon} />
                                    <td>Longitude </td>
                                    <td>{longitude}</td>
                                </tr>
                            </tbody>
                        </table> */}
                        <div className='data-container minCard'>

                            <div className='element'>

                                <div className='data' style={{ textAlign: 'center' }}>

                                    <img alt='icon' src={latitudeIcon} />

                                    <div className='text'>Latitude</div>
                                    <div className='humidity-percent'> {latitude}</div>
                                </div>
                            </div>

                            <div className='element'>
                                <div className='data' style={{ textAlign: 'center' }}>

                                    <img alt='icon' src={longitudeIcon} />

                                    <div className='text'>Longitude</div>
                                    <div className='humidity-percent'> {longitude}</div>
                                </div>
                            </div>

                        </div>

                        <div style={{ display: 'flex' }}>
                            <h4>Wanna know the weather status for your Current Location?</h4>

                            <button className="BtnLight" type='submit' onClick={() => setShowCurrentLocation(true)}>
                                Find
                                <img src={search_icon} alt='search' width='30px' />
                            </button>
                        </div>
                    </div>

                    <div className='location-map'>
                        <div className='Card DisplayCard'>
                            <map>
                                <h1>google map</h1>
                            </map>
                        </div>
                    </div>
                </div>

                {
                    showCurrentLocation === true && currentWeatherData !== undefined && (
                        <>

                            <div className='Card DisplayCard'>
                                {/* <h3>Latitude: {currentWeatherData.coord.lat}</h3>
                                <h3>Longitude: {currentWeatherData.coord.lon}</h3> */}

                                <div className='weather-image'>
                                    <img
                                        width="10%"
                                        alt='weatherImg'
                                        src={weatherIcons[currentWeatherData.weather[0].icon]}

                                    />
                                </div>
                                <div className='weather-temp' style={{ color: "black" }}>
                                    <div className='weather-temp' style={{ color: "black" }}> {currentWeatherData.main.temp} ℃</div>
                                </div>

                                <div className='weather-location' style={{ color: "black" }}>
                                    <img alt='icon' width='50px' height='50px' src={location} />
                                    {currentWeatherData.name}
                                </div>
                                <div className='data-container' style={{ color: "black" }}>
                                    <div className='element' style={{ color: "black" }}>
                                        <img className='icon' alt='weather-icon' src={`http://openweathermap.org/img/w/` + currentWeatherData.weather[0].icon + `.png`} />
                                        <div className='data' style={{ color: "black", fontSize: "2.5rem" }}>
                                            {currentWeatherData.weather[0].description}
                                        </div>
                                    </div>
                                </div>
                                <div className='data-container' style={{ color: "black" }}>
                                    <div className='element' style={{ color: "black" }}>
                                        <img alt='icon' className='icon' src={wind_icon} />
                                        <div className='data' style={{ color: "black" }}>
                                            <div className='wind-speed'>{currentWeatherData.wind.speed} m/s</div>
                                            <div className='text'>Wind Speed</div>
                                        </div>
                                    </div>

                                    <div className='element' style={{ color: "black" }}>
                                        <img alt='icon' className='icon' src={humidity_icon} />
                                        <div className='data' style={{ color: "black" }}>
                                            <div className='humidity-percent'>{currentWeatherData.main.humidity} %</div>
                                            <div className='text'>Humidity</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='data-container'>
                                    <div className='element' style={{ color: "black" }}>
                                        <img alt='icon' className='icon' src={airPressure} />
                                        <div className='data'>
                                            <div className='humidity-percent'>{currentWeatherData.main.pressure} mbar</div>
                                            <div className='text'>Pressure</div>
                                        </div>
                                    </div>
                                    <div className='element' style={{ color: "black" }}>
                                        <img alt='icon' className='icon' src={windDegree} />
                                        <div className='data'>
                                            <div className='wind-speed'>{currentWeatherData.wind.deg}°</div>
                                            <div className='text'>Wind Degree</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='element' style={{ justifyContent: "center" }}>
                                    <button type='submit' className='closeBtn' onClick={() => { setShowCurrentLocation(!showCurrentLocation) }}>CLOSE</button>
                                </div>

                            </div>
                        </>
                    )
                }




            </div>

        </>
    );
}

export default App;