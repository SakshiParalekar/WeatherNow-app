const apiKey = "3d4e44e28cbfd6588adc8346a1169767";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherBox = document.getElementById("weatherInfo");
  const errorMsg = document.getElementById("errorMsg");
  const loader = document.getElementById("loader")

  if (city === "") {
    errorMsg.textContent = "Please enter a city name.";
    errorMsg.classList.remove("hidden");
    weatherBox.classList.add("hidden");
    loader.classList.add("hidden");
    return;
  }
  loader.classList.remove("hidden")

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    loader.classList.add("hidden")
    const now = new Date();

    if (data.cod === 200) {
      document.getElementById("cityName").textContent = data.name;
      document.getElementById("temp").textContent = data.main.temp;
      document.getElementById("condition").textContent = data.weather[0].main;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("wind").textContent = data.wind.speed;
      document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      console.log(data.weather[0].icon);

      const condition = data.weather[0].main.toLowerCase();
      console.log("Condition:", condition);

      if (condition.includes("clear")) {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
      } else if (condition.includes("clouds")) {
        document.body.style.backgroundImage = "url('images/clouds.jpg')";
      } else if (condition.includes("rain")) {
        document.body.style.backgroundImage = "url('images/rain.jpg')";
      } else if (condition.includes("snow")) {
        document.body.style.backgroundImage = "url('images/snow.jpg')";
      } else {
        document.body.style.backgroundImage = "url('images/default.jpg')";
      }

      const now = new Date();
      document.getElementById("dateTime").textContent = "As of: " + now.toLocaleString();

      weatherBox.classList.remove("hidden");
      loader.classList.remove("hidden")
      errorMsg.classList.add("hidden");
    } else {
      errorMsg.textContent = "City not found.";
      errorMsg.classList.remove("hidden");
      weatherBox.classList.add("hidden");
    }
  } catch (error) {
    console.error("Error:", error);
    errorMsg.textContent = "Error fetching data.";
    errorMsg.classList.remove("hidden");
    loader.classList.add("hidden")
    weatherBox.classList.add("hidden");
  }
  loader.classList.add("hidden")
}