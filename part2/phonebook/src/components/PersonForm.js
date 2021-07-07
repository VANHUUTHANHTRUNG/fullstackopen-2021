import React, { useState } from "react";

const PersonForm = ({ handleSubmit }) => {
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const resetInputs = () => {
        setNewName("");
        setNewNumber("");
    }

    const onSubmit = (event) => {
        event.preventDefault()
        handleSubmit({name: newName, number: newNumber});
        resetInputs();
    }
    return (
        <form onSubmit={onSubmit}>
            <div>
                name:{" "}
                <input
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                />
            </div>
            <div>
                number:
                <input
                    value={newNumber}
                    onChange={(event) => setNewNumber(event.target.value)}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};
export default PersonForm;
