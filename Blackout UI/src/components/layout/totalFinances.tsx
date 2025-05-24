import styles from "../styles/component_styles/totalFinances.module.css"

import expense from "../../assets/icons/others/expense.png"
import income from "../../assets/icons/others/income.png"

interface TotalFinancesProps {
    type: string;
    value: number;
}

function TotalFinances({ type, value }: TotalFinancesProps) {
    return (
        <>
            {type === "income" ? (
                <div className={` ${styles.totalFinancesContainer} ${styles[type]}`}>
                    <p>Poupança Atual</p>
                    <div>
                        <div className={styles.circle}><img src={income} alt="" /></div>
                        <div className={styles.totalFinance}>
                            <p>R${value}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={` ${styles.totalFinancesContainer} ${styles[type]}`}>
                    <p>Contas pagas</p>
                    <div>
                        <div className={styles.totalFinance}>
                            <p>R${value}</p>
                        </div>
                        <div className={styles.circle}><img src={expense} alt="" /></div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TotalFinances