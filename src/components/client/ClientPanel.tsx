"use client";

import type { Source, ValidAddress, ValidAddressType } from "@/lib/client/source";
import { Dispatch, SetStateAction, useState } from "react";
import Select from "../select";
import apply from "@/lib/client/apply";
import commonStyle from "@/lib/css/common.module.css";
import clientPanelStyle from "@/lib/css/client/clientpanel.module.css";

interface ClientPanelProps extends React.HTMLProps<HTMLDivElement> {
    source: Source|null,
    setSource: Dispatch<SetStateAction<Source|null>>
    pass: string|null
    setPass: Dispatch<SetStateAction<string|null>>
}

const validAddressesTypeOptions: {[key in ValidAddressType]: string} = {
    "EMAIL": "Email",
    "PHONE_NUMBER": "Número de celular",
    "TEMPLATE": "Template"
};

interface ValidAddressesPanelProps {
    validAddresses: ValidAddress[],
    setValidAddresses: Dispatch<SetStateAction<ValidAddress[]>>
}

function ValidAddressesPanel({validAddresses, setValidAddresses}: ValidAddressesPanelProps) {
    const add = () => {
        setValidAddresses([...validAddresses, {address: "", type: "EMAIL"}]);
    };
    return <div>
        <div className={clientPanelStyle.addressList}>
            {validAddresses.map((validAddress, i) => <div key={i}>
                <input 
                    type="text" className={commonStyle.basicElement} name={`address${i}`} 
                    defaultValue={validAddress.address} placeholder="Endereço" 
                />
                <Select 
                    options={{values: validAddressesTypeOptions, selected: validAddress.type}} 
                    className={commonStyle.basicElement} name={`type${i}`}
                />
                <p>Deletar?</p>
                <input type="checkbox" name={`delete${i}`} />
            </div>)}
        </div>
        <button className={commonStyle.basicElement} onClick={add} type="button">+</button>
    </div>;
}

export default function ClientPanel({source, setSource, pass, setPass, ...props}: ClientPanelProps) {
    const [fakeValidAddresses, setFakeValidAddresses] = useState(source!.validAddresses);
    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        const newSource = await apply(source!.id, pass ?? "", fakeValidAddresses.length, data);
        setSource(newSource);
        if(newSource) {
            setFakeValidAddresses(newSource.validAddresses);
            setPass(data.get("pass")?.toString() ?? null);
        }
    };
    return <div {...props}>
        <form onSubmit={handleSubmit} className={commonStyle.basicForm}>
            <input type="text" className={commonStyle.basicElement} name="name" placeholder="Nome" defaultValue={source!.name} />
            <input type="password" className={commonStyle.basicElement} name="pass" defaultValue={pass ?? ""} placeholder="Senha" />
            <ValidAddressesPanel 
                validAddresses={fakeValidAddresses} setValidAddresses={setFakeValidAddresses} 
            />
            <button className={commonStyle.basicElement}>Aplicar</button>
        </form>
    </div>;
}