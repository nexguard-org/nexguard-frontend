"use client";
import ClientPanel from "@/components/client/ClientPanel";
import style from "./page.module.css";
import ClientLogin from "@/components/client/ClientLogin";
import type { Source } from "@/lib/client/source";
import formStyle from "@/lib/css/form.module.css";
import { useState } from "react";

export default function Client() {
    const [source, setSource] = useState<Source|null>(null);
    const [pass, setPass] = useState<string|null>(null);
    return <ClientLogin 
        className={`${formStyle.formContainer} ${style.formContainer}`}
        source={source} setSource={setSource} setPass={setPass}
    >
        <ClientPanel 
            source={source} setSource={setSource} 
            pass={pass} setPass={setPass} 
        />
    </ClientLogin>;
}