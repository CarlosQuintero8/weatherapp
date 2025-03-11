import React from 'react';

function WeatherAudio({ weather, temperature, isFah }) {
	const generarTextoClima = (weather, temperature, isFah) => {
		if (!weather) return '';

		return `
      El clima en ${weather.city}, ${weather.country} es ${weather.description}.
      La temperatura es de ${Math.ceil(temperature)} grados ${
			isFah ? 'Fahrenheit' : 'Celsius'
		}.
      La velocidad del viento es de ${weather.wind} metros por segundo.
      La nubosidad es del ${weather.clouds} por ciento.
      La presión es de ${weather.pressure} hectopascales.
      La humedad es del ${weather.humidity} por ciento.
    `;
	};

	const reproducirAudioClima = (texto) => {
		const synth = window.speechSynthesis;
		const utterance = new SpeechSynthesisUtterance(texto);
		synth.speak(utterance);
	};

	return (
		<div>
			<button
				onClick={() =>
					reproducirAudioClima(generarTextoClima(weather, temperature, isFah))
				}
			>
				Play audio
			</button>
		</div>
	);
}

export default WeatherAudio;
