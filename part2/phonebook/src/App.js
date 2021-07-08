import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
const App = () => {
    const [persons, setPersons] = useState([]);
    useEffect(()=>{
        console.log('Start useEffect')
        axios.get('http://localhost:3001/persons').then(response=>{
            console.log('promise fullfilled')
            setPersons(response.data);
        })
    },[])
    console.log('useEffect ends')
    const [filter, setFilter] = useState("");

    const handleSubmit = ({ name, number }) => {
        if (persons.map((person) => person.name).includes(name)) {
            window.alert(`${name} is already added to phonebook`);
        } else {
            setPersons(persons.concat({ name: name, number: number }));
        }
    };

    const displayedPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase().trim())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilter={setFilter} />
            <PersonForm handleSubmit={handleSubmit} />
            <h2>Numbers</h2>
            <Persons persons={displayedPersons} />
        </div>
    );
};

export default App;

