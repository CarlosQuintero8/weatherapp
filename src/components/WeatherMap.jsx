import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

function WeatherMap() {
	const mapRef = useRef(null);
	const mapInstance = useRef(null);

	useEffect(() => {
		if (!mapInstance.current && mapRef.current) {
			mapInstance.current = L.map(mapRef.current).setView([0, 0], 2);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(mapInstance.current);

			L.Icon.Default.mergeOptions({
				iconRetinaUrl: marker2x.src,
				iconUrl: marker.src,
				shadowUrl: markerShadow.src,
			});
		}

		return () => {
			if (mapInstance.current) {
				mapInstance.current.remove();
				mapInstance.current = null;
			}
		};
	}, []);

	return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
}

export default WeatherMap;
