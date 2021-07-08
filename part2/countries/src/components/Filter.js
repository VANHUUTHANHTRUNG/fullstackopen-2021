const Filter = ({ filter, handleFilter, text }) => {
    return (
        <p>
            <b>{text} </b>
            <input
                value={filter}
                onChange={(event) => {
                    handleFilter(event.target.value);
                }}
            />
        </p>
    );
};

export default Filter;
