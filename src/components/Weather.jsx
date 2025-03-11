import { useState } from 'react';
import WeatherIcon from './WeatherIcon';
import WeatherAudio from './WeatherAudio';
import {
	WiStrongWind,
	WiCloudy,
	WiBarometer,
	WiHumidity,
	WiSunrise,
} from 'react-icons/wi';

function Weather({ weather }) {
	const [isFah, setIsFah] = useState(false);

	const temperature = isFah ? (weather.temp * 9) / 5 + 32 : weather.temp;

	const styles = {
		backgroundColor: 'rgba(255, 255, 255, 0.6)',
		padding: '20px',
		borderRadius: '15px',
		display: 'grid',
		gap: '5px',
	};

	const infoStyles = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '2px',
		width: '80%',
		margin: '0 auto',
	};

	const rowStyles = {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
	};

	const labelStyles = {
		textAlign: 'right',
		whiteSpace: 'nowrap',
		flex: '1',
		paddingRight: '5px',
		width: '100px',
	};

	const valueContainerStyles = {
		textAlign: 'left',
		flex: '1',
		width: '100px',
		paddingLeft: '5px',
	};

	const descriptionStyles = {
		textAlign: 'center',
		marginBottom: '10px',
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

	const iconName = getIconName(weather.id);

	const detailsStyles = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gap: '10px',
		padding: '10px',
	};

	const detailItemStyles = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	};

	const iconStyles = {
		fontSize: '2em',
		marginBottom: '5px',
	};

	const cityIconStyles = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '10px',
		marginBottom: '10px',
	};

	return (
		<div style={styles}>
			<h1>Weather App</h1>
			<div style={cityIconStyles}>
				<WeatherIcon weatherId={weather.id} />
				<p>
					{weather.city}, {weather.country}
				</p>
			</div>
			<div>
				<h2 style={descriptionStyles}>{weather.description}</h2>
				<div style={detailsStyles}>
					<div style={detailItemStyles}>
						<WiSunrise style={iconStyles} />
						<div>6:10</div>
						<div>Sunrise</div>
					</div>
					<div style={detailItemStyles}>
						<WiHumidity style={iconStyles} />
						<div>{weather.humidity}%</div>
						<div>Humidity</div>
					</div>
					<div style={detailItemStyles}>
						<WiStrongWind style={iconStyles} />
						<div>{weather.wind} m/s</div>
						<div>Wind</div>
					</div>
					<div style={detailItemStyles}>
						<WiBarometer style={iconStyles} />
						<div>{weather.pressure} hPa</div>
						<div>Pressure</div>
					</div>
				</div>
			</div>
			<div>
				<h3>
					{Math.ceil(temperature)} {isFah ? '°F' : '°C'}
				</h3>
				<button onClick={() => setIsFah(!isFah)}>
					Change to {isFah ? 'Celsius' : 'Fahrenheit'}
				</button>
			</div>
			<WeatherAudio weather={weather} temperature={temperature} isFah={isFah} />
		</div>
	);
}

export default Weather;
