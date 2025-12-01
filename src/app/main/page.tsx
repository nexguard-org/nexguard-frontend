import { SelectOptions } from "@/components/select";
import commonStyles from "@/lib/css/common.module.css";
import style from "./page.module.css";
import MainForm from "@/components/main/MainForm";
import Padlock from "@/components/padlock";

async function getSourceSelectProps() {
    const values: {[key: string]: string} = await (await fetch(`http://${process.env.API_ADDRESS}/sources/list` as string, {
        method: "GET",
        cache: "no-store"
    })).json();
    return {values: values, selected: Object.entries(values).at(0)?.[0]} as SelectOptions;
}

export default async function Main() {
    return <>
        <div className={style.wrapper}>
            <h1>NexGuard<Padlock className={commonStyles.padlock} width={50} height={50} /></h1>
            <MainForm sourceSelectOptions={await getSourceSelectProps()} />
        </div>
    </>;
}