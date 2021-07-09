import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import PersonsView from "./components/PersonsView";
import Filter from "./components/Filter";
import Persons from "./services/Persons";
const App = () => {
    const [persons, setPersons] = useState([]);
    useEffect(() => {
        Persons.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);
    const [filter, setFilter] = useState("");

    const handleSubmit = (submittedPerson) => {
        const { name } = submittedPerson;
        const foundPerson = persons.find(person=>person.name === name);
        if (foundPerson !== undefined) {
            if (
                window.confirm(
                    `${name} is already added to phonebook, update a new number?`
                )
            ) {
                Persons.updatePerson(foundPerson.id, submittedPerson).then(
                    (updatedPerson) =>
                        setPersons(
                            persons.map((person) =>
                                person.name !== updatedPerson.name
                                    ? person
                                    : updatedPerson
                            )
                        )
                );
            }
        } else {
            Persons.addPerson(submittedPerson).then((addedPerson) =>
                setPersons([...persons, addedPerson])
            );
        }
    };

    const handleRemove = (removedPerson) => {
        const removedPersonID = persons.find(
            (person) => person === removedPerson
        ).id;

        if (
            removedPersonID !== undefined &&
            window.confirm(`Delete ${removedPerson.name} ?`)
        ) {
            Persons.removePerson(removedPersonID).then(() =>
                Persons.getAll().then((currentPersons) =>
                    setPersons(currentPersons)
                )
            );
        } else {
            window.alert("Not in database");
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
            <PersonsView
                persons={displayedPersons}
                handleRemove={handleRemove}
            />
        </div>
    );
};

export default App;

// Create services folder for persons handling, add getAll, create, replace method
