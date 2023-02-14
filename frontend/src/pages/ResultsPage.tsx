import {useLocation, useNavigate} from "react-router";
import './ResultsPage.css';
import React from "react";
import PlaneInfoCard from "../components/PlaneInfoCard";
import WeatherInfoCard from "../components/WeatherInfoCard";
import MissionErrorCard from "../components/MissionErrorCard";
import {useTranslation} from "react-i18next";

function ResultsPage(){
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const {takeoffTime, takeoffPosition, massToRemove, availableHours, minTemp, maxTemp, mass} = location.state; // read data passed in state from HomePage

    return (
        <>
            <div className={"res-main-flexbox"}>
                <h1 className={"res-title"}>{t("results-title")}</h1>
                <p className={"res-subtitle"}>{ t("for-mass", {mass: mass}) }</p>

                <MissionErrorCard massToRemove={massToRemove} availableHours={availableHours}/>

                <div className={"res-card-container"}>

                    <PlaneInfoCard takeoffTime={takeoffTime} takeoffPos={takeoffPosition}/>
                    <WeatherInfoCard availableHours={availableHours} minTempature={minTemp} maxTempature={maxTemp}/>
                </div>
            </div>

            <div className={"res-change-button-container"}>
                <button className={"button-big"} onClick={() => {navigate('/')}}> {t("change-mass")} </button>
            </div>
        </>
    )
}

export default ResultsPage;