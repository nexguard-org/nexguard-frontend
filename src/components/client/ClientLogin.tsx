"use client";

import login from "@/lib/client/login";
import type { Source } from "@/lib/client/source";
import { Dispatch, SetStateAction } from "react";

interface ClientLoginProps extends React.HTMLProps<HTMLDivElement> {
    source: Source|null
    setSource: Dispatch<SetStateAction<Source|null>>
    setPass: Dispatch<SetStateAction<string|null>>
}

export default function ClientLogin({source, setSource, setPass, ...props}: ClientLoginProps) {
    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        setSource(await login(data));
        if(source) {
            setPass(data.get("pass")!.toString());
        }
    };
    return <>{source ? props.children :
        <div {...props}>
            <form onSubmit={handleSubmit} >
                <input type="text" name="id" placeholder="ID" required />
                <input type="password" name="pass" placeholder="SENHA" />
                <button>LOGIN</button>
            </form>
        </div>
    }</>;
}