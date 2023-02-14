import "../PooUI.css";
import React, {useEffect, useState} from "react";
import './HomePage.css'
import {useNavigate} from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useTranslation } from 'react-i18next';

function HomePage() {
    const {t, i18n} = useTranslation();

    const massInputRef = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(massInputRef.current?.value == null) return;

        // check if input is valid and that date is selected
        if (isNaN(Number(massInputRef.current?.value)) || selectedDate == null) {
            alert("Please enter a valid number");
            return;
        }
        else {
            const mass = parseFloat(massInputRef.current?.value);
            let dateString = selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
            // if the month or day is a single digit, add a 0 in front of it
            if (selectedDate.getMonth() + 1 < 10) {
                // yyyy-0m-dd
                dateString = dateString.slice(0, 5) + "0" + dateString.slice(5);
            }
            if (selectedDate.getDate() < 10) {
                // yyyy-mm-0d
                dateString = dateString.slice(0, 8) + "0" + dateString.slice(8);
            }
            // make a request to the backend on port 8080 to get the plane info
            fetch(`http://localhost:8080/?inputMass=${mass}&date=${dateString}`)
                .then(res => res.json())// parse the result JSON
                .then((data) => {
                    console.log("Got data from sever: ")
                    console.log(data)
                    const newdata = {...data, mass: mass};
                    // navigate to the results page and pass the data as state
                    navigate('/results', {state: newdata});
                })
        }
    }

    return (
        <>
            <div className={"home-lang-switch"}>
                <button className={"button-outlined has-dropdown"}> {t("language-name")} </button>
                <div className={"dropdown"}>
                    <button onClick={()=> {changeLanguage("en")}}>English (EN)</button>
                    <button onClick={()=> {changeLanguage("he")}}>עברית (HE)</button>
                    <button onClick={()=> {changeLanguage("ar")}}>عربي (AR) (Via Google Translate)</button>
                </div>
            </div>

            <div className={'home-main-flexbox'}>

                <div className={'home-flexbox-item'}>
                    <p className={"home-title"}>{t("home-title")}</p>
                    <p className={"home-subtitle"}>{t("home-subtitle")}</p>
                    <br/> <br/>
                    <form className={"home-mass-form"} onSubmit={submitForm}>
                        <input
                            placeholder={t("mass-placeholder")!}
                            type={"number"}
                            ref={massInputRef}
                            required
                        />
                        <DatePicker
                            placeholderText={t("date-placeholder")!}
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            calendarClassName={"date-picker"}
                            clearButtonClassName={"date-picker-clear-button"}
                            className={"date-picker-input"}
                            dayClassName={(day) => "date-picker-day"}
                            todayButton={"Today"}
                            dateFormat={"dd/MM/yyyy"}
                            withPortal
                            isClearable
                            required
                        />
                        <button type={"submit"} className={"button-big"}> {t("next-button")} </button>
                    </form>
                </div>

                <div className={'home-flexbox-item-center home-hide-small-screen'}>
                    <span className="material-symbols-rounded home-plane-icon">flight</span>
                </div>

            </div>
        </>
    );
}

export default HomePage;