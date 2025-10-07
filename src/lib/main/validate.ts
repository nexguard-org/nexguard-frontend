"use server";

export interface ValidateResponse {
    isSourceValid: boolean,
    isContentValid: boolean
}

export default async function validate(data: FormData) {
    return await (await fetch(`http://${process.env.API_ADDRESS}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            source: data.get("source")?.toString(),
            sourceId: data.get("sourceId")?.toString(),
            content: data.get("content")?.toString(),
            type: data.get("type")?.toString().toUpperCase()
        })
    })).json() as ValidateResponse;
}