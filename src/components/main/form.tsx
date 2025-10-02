"use client";

import React, { useState } from "react";
import Select, { SelectOptions } from "../select";
import validate, { ValidateResponse } from "@/lib/main/validate";

function getAddressInputType(option: string) {
    switch(option) {
        case "email":
            return "email";
        case "number":
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
        values: {"email": "Email", "number": "Número de Celular"}, selected: "email"
    };
    const [type, setType] = useState(typeSelectOptions.selected);
    const [validateResponse, setValidateResponse] = useState<ValidateResponse|null>(null);
    const handleValidate = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setValidateResponse(await validate(new FormData(ev.currentTarget)));
    };
    return <div {...props}>
        <form onSubmit={handleValidate}>
            <Select options={sourceSelectOptions} name="sourceId" />
            <Select options={typeSelectOptions} onChange={s => setType(s.currentTarget.value)} name="type" />
            <input type={getAddressInputType(type)} name="source" placeholder={typeSelectOptions.values[type]} required />
            <textarea name="content" placeholder="Mensagem" required></textarea>
            <button>Enviar</button>
        </form>
        <ul style={{visibility: validateResponse ? "unset" : "hidden"}}>
            <li>Fonte: {validateResponse?.isSourceValid ? "Válida" : "Inválida"}</li>
            <li>Conteúdo: {validateResponse?.isContentValid ? "Válido" : "Inválido"}</li>
        </ul> 
    </div>;
}