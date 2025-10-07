"use server";

import type { Source } from "./source";

export default async function login(data: FormData) {
    const res = (await fetch(`http://${process.env.API_ADDRESS}/sources/${data.get("id")?.toString()}`, {
        method: "GET",
        headers: { "Authorization": data.get("password")?.toString() ?? "" },
    }));
    if(res.status !== 200) {
        return null;
    }
    return await res.json() as Source;
}