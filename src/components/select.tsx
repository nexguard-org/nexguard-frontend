import React from "react";

export type SelectOptions = {values: {[value: string]: string}, selected: string};

export interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
    options: SelectOptions|null
}

export default function Select({options, ...props}: SelectProps) {
    return <>{options ? <select defaultValue={options.selected} {...props}>
        {Object.entries(options.values).map(([value, name]) =>
            <option value={value} key={value}>{name ?? value}</option>
        )}
    </select> : <select {...props}></select>}</>;
}