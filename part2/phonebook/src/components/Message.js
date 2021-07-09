const Message = ({ flag, text }) => {
    const messageStyle = {
        color: flag === "error" ? "red" : "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        textAlign: "center",
    };
    console.log({ flag, text });
    return (
        <div style={messageStyle}>
            <br />
            <em>{text}</em>
        </div>
    );
};

export default Message;
