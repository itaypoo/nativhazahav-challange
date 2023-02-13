import '../PooUI.css'
import React from "react";
import {useTranslation} from "react-i18next";

const planeImage = require("../images/plane.png")

type planeCardProps = {
    takeoffTime: number,
    takeoffPos: number
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

    return (
        <div className={"card"} style={{width: "270px", height: "400px"}}>
            <img src={planeImage} className={"card-header"} style={{width: "270px", height: "100px", objectFit: "cover"}}/>
            <h3> {t("plane-card-title")} </h3>
            <p>{ t("pos-at-takeoff") }</p>
            <p>{props.takeoffPos} {t("meters")}</p>
            <p className={"has-tooltip"}> <span className="material-symbols-rounded icon">info</span> {t("time-before-takeoff")} </p>
            <div className={"tooltip"}>{ t("takeoff-time-tooltip") }</div>
            <p style={(props.takeoffTime > 60) ? styles.redText : styles.normal}>{props.takeoffTime} {t("seconds")}</p>
        </div>
    )
}

export default PlaneInfoCard;