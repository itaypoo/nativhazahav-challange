import '../PooUI.css'
import React from "react";
import {useTranslation} from "react-i18next";

const skyImage = require("../images/sky.png")

type planeCardProps = {
    minTempature: number,
    maxTempature: number,
    availableHours: number[],
}

const styles = {
    redText: {
        color: "red"
    },
    normal: {

    }
}

function PlaneInfoCard(props: planeCardProps) {
    const {t, i18n} = useTranslation()
    let hoursString = ""
    let noHours = false
    if(props.availableHours.length === 0){
        hoursString = t("no-hours")
        noHours = true
    }
    else{
        hoursString = props.availableHours.map((temp, i) => " " + temp.toString()).toString()
    }

    return (
        <div className={"card"} style={{width: "270px", height: "400px"}}>
            <img src={skyImage} className={"card-header"} style={{width: "270px", height: "100px", objectFit: "cover"}}/>
            <h3>{ t("weather-card-title") }</h3>
            <p>{ t("temp-at-takeoff") }</p>
            <p>{ t("mindeg-to-maxdeg", {min: props.minTempature, max: props.maxTempature}) }</p>
            <p className={"has-tooltip"}> <span className="material-symbols-rounded icon">info</span> {t("available-hours")} </p>
            <div className={"tooltip"}> {t("weather-tooltip-1")} <br/> {t("weather-tooltip-2")} </div>
            <p style={noHours? styles.redText : styles.normal}>{ hoursString }</p>
        </div>
    )
}

export default PlaneInfoCard;