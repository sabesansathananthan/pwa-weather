import React, { useState } from "react";
import styled from "@emotion/styled";
import { TextField, InputAdornment, IconButton, Card } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import fetchWeather from "./api/fetchWeather";
import bgImg from "./assets/weather.jpg";

const Container = styled.div((props) => ({
  background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.418)),
    url(${bgImg})`,
  backgroundSize: `cover`,
  backgroundPosition: `center`,
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    marginBottom: "5%",
    background: "rgba(250, 250, 250, 0.85)",
    outline: "none",
    borderRadius: "20px",
  },
  "& .MuiOutlinedInput-input": {
    padding: "20px 7%",
  },
});

const WeatherCard = styled(Card)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "50px 8%",
  borderRadius: "20px",
  background: "rgba(250, 250, 250, 0.85)",
  boxShadow: "10px 10px 5px 0px rgba(15, 15, 15, 0.404)",
});

const CityText = styled.h2({
  fontSize: "2em",
});
const CountryText = styled.sup({
  padding: "0.2em 0.6em",
  marginLeft: "0.2em",
  borderRadius: "30px",
  color: "#fff",
  background: "#ff8c00",
  fontSize: "0.5em",
});

const TempSection = styled.div({
  fontSize: "5rem",
  fontWeight: "bold",
  marginTop: "10px",
  color: "#1e2432",
  textAlign: "center",
});

const TempUnitText = styled.sup({
  fontSize: "0.5em",
});

const InfoSection = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const InfoImg = styled.img({
  marginTop: "10px",
  width: "100px",
  height: "100px",
});

const Infotext = styled.p({
  marginTop: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery("");
    }
  };

  return (
    <Container>
      <CssTextField
        placeholder="City ex: New York"
        type="text"
        variant="outlined"
        size="medium"
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
        value={query}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: query && (
            <IconButton
              aria-label="toggle query visibility"
              onClick={() => setQuery("")}
            >
              <CancelIcon />
            </IconButton>
          ),
        }}
      />
      {weather.main && (
        <WeatherCard>
          <CityText>
            <span>{weather.name}</span>
            <CountryText>{weather.sys.country}</CountryText>
          </CityText>
          <TempSection>
            {Math.round(weather.main.temp)}
            <TempUnitText>&deg;C</TempUnitText>
          </TempSection>
          <InfoSection>
            <InfoImg
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <Infotext>{weather.weather[0].description}</Infotext>
          </InfoSection>
        </WeatherCard>
      )}
    </Container>
  );
};

export default App;
