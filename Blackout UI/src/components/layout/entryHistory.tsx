import styles from "../styles/component_styles/entryHistory.module.css"

import plus from "../../assets/icons/others/plus.png"
import minus from "../../assets/icons/others/minus.png"
import trash from "../../assets/icons/others/trash.png"
import { Transaction } from "../../services/api";

interface EntryHistoryProps {
    transaction: Transaction;
    onDelete: (id: number, tipo: Transaction["tipo"]) => void;
}


function EntryHistory({ transaction, onDelete }: EntryHistoryProps) {
    const { id, tipo, categoria, descricao, data, valor } = transaction;

    // Ajusta classe para os estilos lowercase sem acento
    const tipoClass = tipo === "Entrada" ? "entrada" : "saida";

    const formatDate = (rawDate: string) => {
        const parsed = new Date(rawDate);
        return parsed.toLocaleDateString("pt-BR");
    };

    return (
        <div className={styles.entryHistory_container}>
            <div className={`${styles.sign} ${styles[tipoClass]}`}>
                {tipo === "Entrada" ? <img src={plus} alt="entrada" /> : <img src={minus} alt="saída" />}
            </div>
            <div className={`${styles.transation_info} ${styles[tipoClass]}`}>
                <ul className={styles.textInfo}>
                    <li>{categoria}</li>
                    <li>{descricao}</li>
                    <li>R${valor}</li>
                    <li>{formatDate(data)}</li>
                </ul>
            </div>
            <div className={styles.trash} style={{ cursor: "pointer" }} onClick={() => {
                if (id !== undefined) {
                    onDelete(id, tipo);
                }
            }} title="Excluir transação">
                <img src={trash} alt="Excluir" />
            </div>
        </div>
    );
}

export default EntryHistory