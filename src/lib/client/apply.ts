"use server";

import type { Source, ValidAddress, ValidAddressType } from "./source";

export default async function apply(id: number, pass: string, validAddressCount: number, data: FormData) {
    let validAddresses: ValidAddress[] = new Array(validAddressCount);
    for(let i = 0; i < validAddressCount; ++i) {
        if(data.get(`delete${i}`)?.toString() === "on") {
            continue;
        }
        validAddresses[i] = {
            address: data.get(`address${i}`)!.toString(),
            type: data.get(`type${i}`)!.toString() as ValidAddressType
        };
    }
    validAddresses = validAddresses.filter(n => n);
    const response = await fetch(`http://${process.env.API_ADDRESS}/sources/${id}`, {
        method: "PUT",
        headers: { "Authorization": pass, "Content-Type": "application/json" },
        body: JSON.stringify({
            name: data.get("name")!.toString(),
            password: data.get("pass")!.toString(),
            validAddresses: validAddresses
        })
    });
    if(response.status !== 200) {
        return null;
    }
    return await response.json() as Source;
}