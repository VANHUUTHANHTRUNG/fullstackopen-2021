const CountryClickShow = ({country, handleClick}) => {
    return (
    <div>
        <p>{country.name}</p>
        <button onClick={()=>handleClick(country.name.toLowerCase())}>Show</button>
    </div>
    )
}

export default CountryClickShow;
