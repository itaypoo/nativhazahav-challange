import {useTranslation} from "react-i18next";

type missionErrorCardProps = {
    massToRemove: number,
    availableHours: number[],
}

function MissionErrorCard(props: missionErrorCardProps) {
    const {t, i18n} = useTranslation()
    let errorAmount = 0
    let errorText: string[] = []

    if(props.massToRemove > 0) {
        errorAmount += 1
        errorText.push(t("time-bigger-than-60"))
        errorText.push(t("remove-atleast-mass", {mass: props.massToRemove}))
    }
    if(props.availableHours.length === 0) {
        errorAmount += 1
        errorText.push(t("no-available-hours-for"))
        errorText.push(t("choose-another-day"))
    }

    if(errorAmount > 0) {
        return (
            <>
                <div className={"card card-alert res-error-box"}>
                    <div className={"res-icon-div"}>
                        <span className="material-symbols-rounded">emergency_home</span>
                        <p> {t("mission-cannot-complete")} {(errorAmount === 1) ? t("issue-found") : t("issues-found", {amount: errorAmount})}</p>
                    </div>
                    {
                        errorText.map((text, index) => {
                            return (
                                <p key={index}>{text}</p>
                            )
                        })
                    }
                </div>
            </>
        )
    }
    else {
        return <></>
    }
}

export default MissionErrorCard;