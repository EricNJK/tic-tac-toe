export default function Square(props) {

    return (
        <button className={"square" + (props.value ? " occupied" : "")} onClick={props.onClick}>
            {props.value}
        </button>
    );
}
