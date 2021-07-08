import CountryView from "./CountryView";
import CountryClickShow from "./CountryClickShow";
import WeatherReport from "./WeatherReport";
const Countries = ({ countries, handleClick }) => {
    if (countries.length >= 10) {
        return <p>Too many matches, specify another filter</p>;
    } else if (countries.length < 10 && countries.length > 1) {
        return countries.map((country) => (
            <CountryClickShow
                key={country.alpha2Code}
                country={country}
                handleClick={handleClick}
            />
        ));
    } else if (countries.length === 1) {
        return (
            <div>
                <CountryView country={countries[0]} />
                <WeatherReport capital={countries[0].capital} />
            </div>
        );
    } else {
        return <p>Country not found</p>;
    }
};

export default Countries;
