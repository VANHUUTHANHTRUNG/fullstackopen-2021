import React, { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" },
    ]);

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

