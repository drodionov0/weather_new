import styles from '../styles/weather.module.scss';
import { useState } from 'react'; 



const Weather = () => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [city, setCity] = useState('');

    const getWeather = async (e: any) => {
        e.preventDefault();
        const apikey = '4b729ae248ec692da7a20b39bb0cd57d';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
        const data = await response.json();
        setWeatherData(data);
        console.log(data);
    }

    return(
        <div className={styles.page}>
                <div className={styles.oriental}>
                    <div className={styles.search}>
                        <form>
                            <input placeholder='Введите город' className={styles.inp} onChange={e => setCity(e.target.value)}></input>
                            <button className={styles.btn} onClick={getWeather}>🔎</button>
                        </form>
                    </div>
                    { weatherData && weatherData.cod !== 200 && 
                        <div className={styles.error}>
                            <p>Город не найден!</p>
                        </div>
                    }

                    { weatherData && weatherData.cod === 200 &&
                        <div className={styles.weather}> 
                            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='icon' className={styles.centered}></img>
                            <p>Температура: {Math.round(weatherData.main.temp - 273)} °C</p>
                            <p>Погода: {weatherData.weather[0].main}</p>
                        </div>
                    }
                </div>
            </div>
            
    );
}

export default Weather;