import {
	WiThunderstorm,
	WiRain,
	WiSnow,
	WiFog,
	WiDaySunny,
	WiCloudy,
	WiShowers,
} from 'react-icons/wi';
import './WeatherIcon.css';

function WeatherIcon({ weatherId }) {
	const icons = {
		thunderstorm: <WiThunderstorm size="4em" className="pulsing-icon" />,
		drizzle: <WiShowers size="4em" className="pulsing-icon" />,
		rain: <WiRain size="4em" className="pulsing-icon" />,
		snow: <WiSnow size="4em" className="pulsing-icon" />,
		atmosphere: <WiFog size="4em" className="pulsing-icon" />,
		clear: <WiDaySunny size="4em" className="pulsing-icon" />,
		clouds: <WiCloudy size="4em" className="pulsing-icon" />,
	};

	const codes = {
		thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
		drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
		rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
		snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
		atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
		clear: [800],
		clouds: [801, 802, 803, 804],
	};

	const getIconName = (code) => {
		for (const icon in codes) {
			if (codes[icon].includes(code)) {
				return icon;
			}
		}
		return 'clouds';
	};

	const iconName = getIconName(weatherId);

	return icons[iconName] || null;
}

export default WeatherIcon;
