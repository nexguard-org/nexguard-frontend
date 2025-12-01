"use client";

import React, { useState } from "react";
import Select, { SelectOptions } from "../select";
import validate, { ValidateResponse } from "@/lib/main/validate";
import commonStyle from "@/lib/css/common.module.css";
import style from "@/lib/css/main/mainform.module.css";
import ResultPopup from "./ResultPopup";

const sourceMessage = `É a verificação mais poderosa, caso seja inválida é quase certo que a mensagem é falsa.`;
const contentMessage = `Verificação válida apenas para mensagens automátizadas, caso a fonte seja válida, o conteúdo ainda pode ser inválido.`;

function getAddressInputType(option: string) {
    switch(option) {
        case "EMAIL":
            return "email";
        case "PHONE_NUMBER":
            return "tel";
        default:
            return "text";
    }
}

export interface MainFormProps extends React.HTMLProps<HTMLDivElement> {
    sourceSelectOptions: SelectOptions
}

export default function MainForm({sourceSelectOptions, ...props}: MainFormProps) {
    const typeSelectOptions: SelectOptions = {
        values: {"EMAIL": "Email", "PHONE_NUMBER": "Número de Celular"}, selected: "EMAIL"
    };
    const [type, setType] = useState(typeSelectOptions.selected);
    const [validateResponse, setValidateResponse] = useState<ValidateResponse|null>(null);
    const [resultKey, setResultKey] = useState(0);
    const [resultPopupVisible, setResultPopupVisible] = useState(false);
    const [resultPopupText, setResultPopupText] = useState("");
    const handleValidate = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setValidateResponse(await validate(new FormData(ev.currentTarget)));
        setResultKey(resultKey+1);
    };
    return <>
        <ResultPopup visible={resultPopupVisible} setVisible={setResultPopupVisible} text={resultPopupText} />
        <div {...props} className={style.formWrapper}>
            <form onSubmit={handleValidate} className={commonStyle.basicForm}>
                <Select className={style.formElement} options={sourceSelectOptions} name="sourceId" />
                <Select className={style.formElement} options={typeSelectOptions} onChange={s => setType(s.currentTarget.value)} name="type" />
                <input className={style.formElement} type={getAddressInputType(type)} name="source" placeholder={typeSelectOptions.values[type]} required />
                <textarea className={style.formElement} name="content" placeholder="Mensagem" required></textarea>
                <button className={style.formButton}>Enviar</button>
            </form>
            <ul style={{visibility: validateResponse ? "unset" : "hidden"}} key={resultKey}>
                <li>
                    Fonte: {validateResponse?.isSourceValid ? "Válida" : "Inválida"}
                    <button onClick={() => {
                        setResultPopupVisible(true);
                        setResultPopupText(sourceMessage);
                    }}>❔</button>
                </li>
                <li>
                    Conteúdo: {validateResponse?.isContentValid ? "Válido" : "Inválido"}
                    <button onClick={() => {
                        setResultPopupVisible(true);
                        setResultPopupText(contentMessage);
                    }}>❔</button>
                </li>
            </ul> 
        </div>
    </>;
}