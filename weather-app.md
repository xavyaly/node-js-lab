# Sample Project Ideas

# Weather Application Using External APIs

Here's a complete end-to-end weather application using Node.js, Express, and the OpenWeatherMap API. This includes frontend and backend code.

## Project Structure

```
weather-app/
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── views/
│   └── index.ejs
├── .env
├── app.js
├── package.json
└── README.md
```

## Backend Implementation (app.js)

```javascript
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});

app.post('/weather', async (req, res) => {
  const city = req.body.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const weather = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      feels_like: Math.round(response.data.main.feels_like),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      pressure: response.data.main.pressure,
      sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString(),
      coordinates: response.data.coord
    };
    res.render('index', { weather, error: null });
  } catch (error) {
    res.render('index', { 
      weather: null, 
      error: 'Error fetching weather data. Please try again.' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Frontend Implementation

### views/index.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather App</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <div class="container">
    <h1>Weather App</h1>
    <form action="/weather" method="POST">
      <input type="text" name="city" placeholder="Enter city name" required>
      <button type="submit">Get Weather</button>
    </form>

    <% if (weather !== null) { %>
      <div class="weather-info">
        <h2><%= weather.city %>, <%= weather.country %></h2>
        <div class="weather-main">
          <img src="https://openweathermap.org/img/wn/<%= weather.icon %>@2x.png" alt="<%= weather.description %>">
          <div class="temp"><%= weather.temperature %>°C</div>
        </div>
        <p class="description"><%= weather.description %></p>
        <div class="details">
          <p>Feels like: <%= weather.feels_like %>°C</p>
          <p>Humidity: <%= weather.humidity %>%</p>
          <p>Wind: <%= weather.wind %> m/s</p>
          <p>Pressure: <%= weather.pressure %> hPa</p>
          <p>Sunrise: <%= weather.sunrise %></p>
          <p>Sunset: <%= weather.sunset %></p>
        </div>
      </div>
    <% } %>

    <% if (error !== null) { %>
      <p class="error"><%= error %></p>
    <% } %>
  </div>
</body>
</html>
```

### public/css/style.css
```css
body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  margin-bottom: 1.5rem;
}

input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

button:hover {
  background: #45a049;
}

.weather-info {
  margin-top: 1.5rem;
}

.weather-main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.temp {
  font-size: 3rem;
  font-weight: bold;
  margin-left: 1rem;
}

.description {
  text-transform: capitalize;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  text-align: left;
  margin-top: 1rem;
}

.error {
  color: #f44336;
  margin-top: 1rem;
}
```

## Setup Instructions

1. **Create a new project folder** and initialize it:
   ```bash
   mkdir weather-app
   cd weather-app
   npm init -y
   ```

2. **Install required dependencies**:
   ```bash
   npm install express axios ejs dotenv
   ```

3. **Create the necessary files** as shown in the project structure above.

4. **Get an API key** from [OpenWeatherMap](https://openweathermap.org/api) (it's free for limited usage).

5. **Create a .env file** in your project root:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=3000
   ```

6. **Start the application**:
   ```bash
   node app.js
   ```

7. **Open your browser** and visit `http://localhost:3000`

## Features

1. **City Search**: Users can enter any city name to get weather information
2. **Comprehensive Data**: Displays temperature, feels-like, humidity, wind speed, pressure, sunrise/sunset times
3. **Weather Icons**: Visual representation of current weather conditions
4. **Responsive Design**: Works well on both desktop and mobile devices
5. **Error Handling**: Shows user-friendly error messages

## Enhancements You Could Add

1. **Geolocation**: Add a button to get weather for user's current location
2. **Forecast**: Extend to show 5-day forecast
3. **Unit Toggle**: Allow switching between Celsius and Fahrenheit
4. **Local Storage**: Remember last searched city
5. **More APIs**: Integrate additional weather APIs for redundancy

This complete implementation gives you a fully functional weather application that you can deploy or extend further.
