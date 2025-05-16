const weatherDiv = document.getElementById("weather-info");

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const apiKey = "d85a432458a99143e228129c38dc1d60";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        weatherDiv.innerHTML = `<p>Could not fetch weather: ${data.message}</p>`;
        return;
      }
      const weather = data.weather[0].description;
      const temp = data.main.temp;
      const city = data.name;
      console.log(`Weather: ${weather}, Temp: ${temp}°C, Location: ${city}`);

      weatherDiv.innerHTML = `
                <p>📍 <strong>${city}</strong></p>
                <p>🌡️ ${temp}°C – ${weather}</p>
            `;
    })
    .catch((err) => {
      weatherDiv.innerHTML = `<p>Error fetching weather data.</p>`;
      console.error(err);
    });
}

function error() {
  weatherDiv.innerHTML =
    "<p>Unable to retrieve your location. Please allow location access.</p>";
}

function showSideBar(){
  const sideBar = document.querySelector('.sidebar')
  sideBar.style.display = 'flex'
}

function hideSideBar(){
  const sideBar = document.querySelector('.sidebar')
  sideBar.style.display = 'none'
}

function clear(){
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageTextArea = document.getElementById("message");

  nameInput.value = "";
  emailInput.value = "";
  messageTextArea.value = "";
}
