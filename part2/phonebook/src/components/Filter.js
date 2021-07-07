const Filter = ({filter, handleFilter}) => {
    return (
        <p>
            Filter shown with 
            <input
                value={filter}
                onChange={(event) => {
                    handleFilter(event.target.value)}
                }
            />
        </p>
    );
};

export default Filter;
