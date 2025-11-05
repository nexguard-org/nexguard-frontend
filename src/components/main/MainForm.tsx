"use client";

import React, { useState } from "react";
import Select, { SelectOptions } from "../select";
import validate, { ValidateResponse } from "@/lib/main/validate";
import commonStyle from "@/lib/css/common.module.css";

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
    const handleValidate = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setValidateResponse(await validate(new FormData(ev.currentTarget)));
    };
    return <div {...props}>
        <form onSubmit={handleValidate} className={commonStyle.basicForm}>
            <Select className={commonStyle.basicElement} options={sourceSelectOptions} name="sourceId" />
            <Select className={commonStyle.basicElement} options={typeSelectOptions} onChange={s => setType(s.currentTarget.value)} name="type" />
            <input className={commonStyle.basicElement} type={getAddressInputType(type)} name="source" placeholder={typeSelectOptions.values[type]} required />
            <textarea className={commonStyle.basicElement} name="content" placeholder="Mensagem" required></textarea>
            <button className={commonStyle.basicElement}>Enviar</button>
        </form>
        <ul style={{visibility: validateResponse ? "unset" : "hidden"}}>
            <li>Fonte: {validateResponse?.isSourceValid ? "Válida" : "Inválida"}</li>
            <li>Conteúdo: {validateResponse?.isContentValid ? "Válido" : "Inválido"}</li>
        </ul> 
    </div>;
}