import Link from "next/link";
import styles from "./page.module.css";
import Padlock from "@/components/padlock";
import Lock3d from "@/components/lock3d";

const desc = `Você não precisa ter que adivinhar quais mensagens são reais`;

export default function Home() {
    return <>
        <main className={styles.wrapper}>
            <div className={styles.wrapperLeft}>
                <h1 className={styles.title}>NexGuard
                    <Padlock className={styles.padlock} width={100} height={100} />
                </h1>
                <p className={styles.desc}>{desc}</p>
                <Link href="/main" className={styles.cyanButton}>Começar</Link>
                <Link href="/client" className={styles.clientAnchor}>Já é parceiro nosso?</Link>
            </div>
            <div className={styles.wrapperRight}>
                <Lock3d />
            </div>
        </main>
    </>;
}
