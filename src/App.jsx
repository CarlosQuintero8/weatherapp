import { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import { ClipLoader } from 'react-spinners';
import thunderstormImage from './assets/thunderstorm.jpg';
import drizzleImage from './assets/drizzle.jpg';
import rainImage from './assets/rain.jpg';
import snowImage from './assets/snow.jpg';
import atmosphereImage from './assets/atmosphere.jpg';
import clearImage from './assets/clear.jpg';
import cloudsImage from './assets/clouds.jpg';

const API_KEY = 'de8f42253267642c2746172eebd05669';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

const codes = {
	thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
	drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
	rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
	snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
	atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
	clear: [800],
	clouds: [801, 802, 803, 804],
};

const icons = {
	thunderstorm: '⛈️',
	drizzle: '🌦️',
	rain: '🌧️',
	snow: '❄️',
	atmosphere: '🌫️',
	clear: '☀️',
	clouds: '☁️',
};

const weatherImages = {
	thunderstorm: thunderstormImage,
	drizzle: drizzleImage,
	rain: rainImage,
	snow: snowImage,
	atmosphere: atmosphereImage,
	clear: clearImage,
	clouds: cloudsImage,
};

function App() {
	const [coords, setCoords] = useState(null);
	const [weather, setWeather] = useState(null);
	const [cargando, setCargando] = useState(true);
	const [permisoDenegado, setPermisoDenegado] = useState(false);
	const [ciudad, setCiudad] = useState('');
	const [mensajeDeError, setMensajeDeError] = useState(null);

	useEffect(() => {
		obtenerUbicacion();
	}, []);

	const obtenerUbicacion = () => {
		if (window.navigator.geolocation) {
			function success({ coords }) {
				const { latitude, longitude } = coords;
				setCoords({ lat: latitude, lon: longitude });
				setPermisoDenegado(false);
			}
			function error(error) {
				setPermisoDenegado(true);
				setCargando(false);
				console.log('permission denied');
			}

			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	};

	const buscarClimaPorCiudad = () => {
		if (ciudad) {
			setCargando(true);
			axios
				.get(`${BASE_URL}q=${ciudad}&units=metric&lang=en&appid=${API_KEY}`)
				.then((res) => {
					const codeId = res.data.weather[0].id;
					const keys = Object.keys(codes);

					setWeather({
						city: res.data.name,
						country: res.data.sys.country,
						temp: res.data.main.temp,
						description: res.data.weather[0].description,
						icon: icons[keys.find((k) => codes[k].includes(codeId))],
						wind: res.data.wind.speed,
						clouds: res.data.clouds.all,
						pressure: res.data.main.pressure,
						humidity: res.data.main.humidity,
						id: codeId,
					});
					setCargando(false);
				})
				.catch((error) => {
					console.error('Error al obtener datos del clima:', error);
					setMensajeDeError(
						'No se pudieron obtener los datos del clima. Inténtalo de nuevo más tarde.',
					);
					setCargando(false);
				});
		} else {
			alert('Por favor, ingresa el nombre de una ciudad.');
		}
	};

	useEffect(() => {
		if (coords) {
			axios
				.get(
					`${BASE_URL}lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=en&appid=${API_KEY}`,
				)
				.then((res) => {
					const codeId = res.data.weather[0].id;
					const keys = Object.keys(codes);

					setWeather({
						city: res.data.name,
						country: res.data.sys.country,
						temp: res.data.main.temp,
						description: res.data.weather[0].description,
						icon: icons[keys.find((k) => codes[k].includes(codeId))],
						wind: res.data.wind.speed,
						clouds: res.data.clouds.all,
						pressure: res.data.main.pressure,
						humidity: res.data.main.humidity,
						id: codeId,
					});
					setCargando(false);
				})
				.catch((error) => {
					console.error('Error al obtener datos del clima:', error);
					setMensajeDeError(
						'No se pudieron obtener los datos del clima. Inténtalo de nuevo más tarde.',
					);
					setCargando(false);
				});
		}
	}, [coords, permisoDenegado]);

	const weatherBackgrounds = {
		thunderstorm: '#4A148C',
		drizzle: '#78909C',
		rain: '#1976D2',
		snow: '#ECEFF1',
		atmosphere: '#B0BEC5',
		clear: '#FFCA28',
		clouds: '#90A4AE',
	};

	const getIconName = (code) => {
		if (code >= 200 && code < 300) return 'thunderstorm';
		if (code >= 300 && code < 400) return 'drizzle';
		if (code >= 500 && code < 600) return 'rain';
		if (code >= 600 && code < 700) return 'snow';
		if (code >= 700 && code < 800) return 'atmosphere';
		if (code === 800) return 'clear';
		if (code >= 801 && code < 900) return 'clouds';
		return 'clouds';
	};

	const backgroundImage = weather
		? `url(${weatherImages[getIconName(weather.id)]})`
		: 'black';

	const styles = {
		display: 'grid',
		placeContent: 'center',
		height: '100dvh',
		textAlign: 'center',
		backgroundImage: backgroundImage,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundColor: weather ? 'black' : 'black',
	};

	return (
		<div style={styles}>
			{cargando ? (
				<ClipLoader color="white" loading={cargando} size={50} />
			) : weather ? (
				<div>
					<Weather weather={weather} />
					<div style={{ marginTop: '20px' }}>
						{' '}
						<input
							type="text"
							placeholder="Enter another city"
							value={ciudad}
							onChange={(e) => setCiudad(e.target.value)}
							id="city-search-input-weather"
						/>
						<button onClick={buscarClimaPorCiudad}>Search</button>
					</div>
				</div>
			) : permisoDenegado ? (
				<div>
					<p style={{ color: 'white' }}>
						Por favor, permite el acceso a tu ubicación para obtener datos del
						clima más exactos o utiliza el buscador para colocar una ciudad.
					</p>
					<p style={{ color: 'white' }}>
						Ve a la configuración de tu navegador, busca "Ubicación" o
						"Privacidad" y asegúrate de que el acceso esté permitido.
					</p>
					<div>
						<input
							type="text"
							placeholder="Ingresa una ciudad"
							value={ciudad}
							onChange={(e) => setCiudad(e.target.value)}
							id="city-search-input-permission"
						/>
						<button onClick={buscarClimaPorCiudad}>Search</button>
					</div>
				</div>
			) : mensajeDeError ? (
				<div style={{ color: 'red' }}>{mensajeDeError}</div>
			) : null}
		</div>
	);
}

export default App;
