const CountryView = ({ country }) => {
    return (
        <div>
            <h3>{country.name}</h3>
            <p>Capital {country.capital} </p>
            <p>Population {country.population}</p>
            <h4>Languages</h4>
            <ol>
                {country.languages.map((language, index) => (
                    <li key={index}>{language.name}</li>
                ))}
            </ol>
            <h4>Flag</h4>
        <img src={country.flag} alt="National flag" width="200" height="100"/>
        </div>
    );
};

export default CountryView;
