import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(() => {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then((response) => {
                setCountries(response.data);
            })
            .catch((error) => console.log(error));
    }, []);
    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(filter.trim().toLowerCase())
    );

    return (
        <div>
            <h2>Search</h2>
            <Filter
                text="Find countries"
                handleFilter={setFilter}
                filter={filter}
            />
            <h2>Result</h2>
        <Countries countries={filteredCountries} handleClick={setFilter}/>
        </div>
    );
};

export default App;
