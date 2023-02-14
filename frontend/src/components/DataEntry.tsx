import './DataEntry.css'

type props = {
    id: number,
    mass: number,
    takeoffTime: number,
    takeoffPosition: number,
    massToRemove: number | null
}
function DataEntry(props: props) {
    return (
        <div className={"data-entry card"}>
            <h3>{props.id}</h3> <br/>
            <p>Mass: {props.mass}   , </p>
            <p>Takeoff time: {props.takeoffTime}   , </p>
            <p>Takeoff position: {props.takeoffPosition}   , </p>
            <p>Mass to remove: {props.massToRemove}</p>
        </div>
    )
}

export default DataEntry