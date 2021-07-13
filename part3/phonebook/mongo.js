const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log(
        "Please provide the password as an argument: node mongo.js <password>"
    );
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.j4ecd.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});
Person = mongoose.model("Person", personSchema);

const addPerson = (name, number, Person) => {
    const newPerson = new Person({
        name,
        number,
    });
    newPerson.save().then((_result) => {
        console.log(`Added ${name} ${number} to our phonebook`);
        mongoose.connection.close();
    });
};

const listAllPeople = (Person) => {
    Person.find({}).then((result) => {
        console.log("Data in phonebook");
        result.forEach((record) =>
            console.log(`Name: ${record.name} Phone: ${record.number}`)
        );
    });
    mongoose.connection.close();
};


function main() {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });

    if (process.argv.length === 3) listAllPeople(Person);
    else if (process.argv.length === 4 && process.argv[3] === "auto")
        addPeople(Person);
    else if (process.argv.length === 5)
        addPerson(process.argv[3], process.argv[4], Person);
    else console.log("Wrong number of argv");
}
main();
