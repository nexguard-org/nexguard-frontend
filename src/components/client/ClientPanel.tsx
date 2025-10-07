"use client";

import type { Source, ValidAddress, ValidAddressType } from "@/lib/client/source";
import { Dispatch, SetStateAction, useState } from "react";
import Select from "../select";
import apply from "@/lib/client/apply";

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
        {validAddresses.map((validAddress, i) => <div key={i}>
            <input 
                type="text" name={`address${i}`} 
                defaultValue={validAddress.address} placeholder="Endereço" 
            />
            <Select 
                options={{values: validAddressesTypeOptions, selected: validAddress.type}} 
                name={`type${i}`}
            />
            <input type="checkbox" name={`delete${i}`} />
        </div>)}
        <button onClick={add} type="button">+</button>
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
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nome" defaultValue={source!.name} />
            <input type="password" name="pass" defaultValue={pass ?? ""} placeholder="Senha" />
            <ValidAddressesPanel 
                validAddresses={fakeValidAddresses} setValidAddresses={setFakeValidAddresses} 
            />
            <button>Aplicar</button>
        </form>
    </div>;
}