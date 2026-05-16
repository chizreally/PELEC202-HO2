import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // OpenWeather API Key
  const API_KEY = "21e20d86ecf456c40771b52b990caed2";

  // Fetch Weather Function
  const fetchWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      // Check if city exists
      if (data.cod !== 200) {
        throw new Error("City not found");
      }

      // Save Weather Data
      setWeather({
        cityName: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main,
      });
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial",
      }}
    >
      <h1>Weather App</h1>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginRight: "10px",
        }}
      />

      {/* Button */}
      <button
        onClick={fetchWeather}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p>{error}</p>}

      {/* Weather Info */}
      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weather.cityName}</h2>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Weather Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default App;