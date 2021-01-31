window.addEventListener('load', () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimeZone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temperature');
	let temperatureSpan = document.querySelector('.temperature span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
			
			// get data from API
			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					// save the data from API for future uses
					const {
						temperature,
						summary,
						icon
					} = data.currently;
					
					// set DOM Elements from the API
					temperatureDegree.textContent = Math.floor(temperature);
					temperatureDescription.textContent = summary;
					let timezone = data.timezone.replace('_', '\u0020');
					locationTimeZone.textContent = timezone.replace('/', ', ');
					// Formula for celsius
					let celsius = (temperature - 32) * (5 / 9);
					
					// set Icon
					setIcons(icon, document.querySelector('.icon'));
					
					// change temperature to Celsius/Farenheit
					temperatureSection.addEventListener('click', () =>{
						if(temperatureSpan.textContent === "&deg;F"){
							temperatureSpan.textContent = "&deg;C";
							temperatureDegree.textContent = Math.floor(celsius);
						}else{
							temperatureSpan.textContent = "&deg;F";
							temperatureDegree.textContent = Math.floor(temperature);
						}
					})
				});
		});

	} else {
		locationTimeZone.textContent = "Please allow location access to get temperature information.";
	}

	function setIcons(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}

});

