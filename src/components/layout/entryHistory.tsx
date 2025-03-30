import styles from "../styles/component_styles/entryHistory.module.css"

import plus from "../../assets/icons/others/plus.png"
import minus from "../../assets/icons/others/minus.png"
import trash from "../../assets/icons/others/trash.png"

interface entryHistoryProps {
    categoria: string
    descricao: string
    tipo: string
    data: string
    valor: string
}


function EntryHistory({ categoria, descricao, tipo, data, valor }: entryHistoryProps) {
    return (
        <div className={`${styles.entryHistory_container}`}>
            <div className={`${styles.sign} ${styles[tipo]}`}>
                {tipo === "entrada" ?
                    (
                        <img src={plus} alt="" />
                    ) :
                    (
                        <img src={minus} alt="" />
                    )
                }
            </div>

            <div className={`${styles.transation_info} ${styles[tipo]}`}>
                <div>
                    <ul className={styles.textInfo}>
                        <li>{categoria}</li>
                        <li>{descricao}</li>
                        <li>R${valor}</li>
                        <li>{data}</li>
                    </ul>
                </div>
            </div>

            <div className={styles.trash}>
                <img src={trash} alt="" />
            </div>
        </div>
    )
}

export default EntryHistory