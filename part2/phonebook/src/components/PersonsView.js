const PersonsView = ({ persons, handleRemove }) => {
    return persons.map((person) => (
        <div key={person.name}>
            <p>
                <b>Name: </b>{person.name}  <b>Phone: </b>{person.number}
            </p>
            <button onClick={() => handleRemove(person)}>Remove</button>
        </div>
    ));
};

export default PersonsView;
