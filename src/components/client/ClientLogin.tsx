"use client";

import login from "@/lib/client/login";
import type { Source } from "@/lib/client/source";
import { Dispatch, SetStateAction } from "react";
import commonStyle from "@/lib/css/common.module.css";

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
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className={commonStyle.basicForm} >
                <input className={commonStyle.basicElement} type="text" name="id" placeholder="ID" required />
                <input className={commonStyle.basicElement} type="password" name="pass" placeholder="SENHA" />
                <button className={commonStyle.basicElement}>LOGIN</button>
            </form>
        </div>
    }</>;
}