import { SelectOptions } from "@/components/select";
import style from "./page.module.css";
import MainForm from "@/components/main/MainForm";

async function getSourceSelectProps() {
    const values: {[key: string]: string} = await (await fetch(`http://${process.env.API_ADDRESS}/sources/list` as string, {
        method: "GET",
    })).json();
    return {values: values, selected: Object.entries(values)[0][0]} as SelectOptions;
}

export default async function Main() {
    return <>
        <div className={style.wrapper}>
            <h1>NexGuard</h1>
            <MainForm sourceSelectOptions={await getSourceSelectProps()} />
        </div>
    </>;
}