
export interface Source {
    id: number,
    name: string,
    password: string,
    validAddresses: ValidAddress[]
}

export interface ValidAddress {
    address: string,
    type: ValidAddressType
}

export type ValidAddressType = "EMAIL"|"PHONE_NUMBER"|"TEMPLATE";