import React, { Dispatch, SetStateAction } from "react";
import style from "@/lib/css/main/resultpopup.module.css";

export interface ResultPopupProps extends React.HTMLProps<HTMLDivElement> {
    text: string
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>
}

export default function ResultPopup({text, visible, setVisible, ...props}: ResultPopupProps) { 
    return <>{visible ? <div className={style.popupScreen} {...props} >
        <div className={style.popup} >
            <button className={style.popupClose} onClick={() => setVisible(false)}>☒</button>
            <div>{text}</div>
        </div>
    </div> : <></>}</>;
}