import DataEntry from "../components/DataEntry";
import {useState} from "react";

function AllDataPage() {
    const [dataEntries, setDataEntries] = useState([<p>Press Get Data to see all past data.</p>])
    // fetch all data from the server and display it using localhost:8080/getPastData=true in the fetch
    // use the DataEntry component to display each data entry

    const getData = () => {
        // fetch all data from localhost:8080/getPastData=true and put in a list
        setDataEntries([<div className={"spinner"}/>])
        fetch(`http://localhost:8080/?getPastData=true`)
            .then(res => res.json())
            .then((data) => {
                console.log("Got data from sever: ")
                console.log(data)
                const dataArray = Array.from(data)
                const newEntries = dataArray.map((entry: any) => {
                    const massToRemove = entry.mass_to_remove ? entry.mass_to_remove : "None"
                    return <DataEntry id={entry.id} mass={entry.mass} takeoffTime={entry.takeoff_time} takeoffPosition={entry.takeoff_position} massToRemove={massToRemove}/>
                })
                if(newEntries.length === 0) {
                    newEntries.push(<p>No data found.</p>)
                }
                setDataEntries(newEntries)
            })
    }

    return (
        <div>
            <h1>All past data:</h1>
            <button onClick={getData}>Get data</button> <br/> <br/>
            {dataEntries}
        </div>
    )
}

export default AllDataPage