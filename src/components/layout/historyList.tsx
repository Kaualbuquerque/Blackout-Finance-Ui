import styles from "../styles/component_styles/historyList.module.css";
import EntryHistory from "./entryHistory";

interface Transaction {
    categoria: string;
    descricao: string;
    tipo: string;
    data: string;
    valor: string;  // Alterando para string
}

interface HistoryListProps {
    transactions: Transaction[];
}

function HistoryList({ transactions }: HistoryListProps) {
    return (
        <div className={styles.history}>
            {transactions.map((transaction, index) => (
                <EntryHistory
                    key={index}
                    categoria={transaction.categoria}
                    descricao={transaction.descricao}
                    tipo={transaction.tipo}
                    valor={transaction.valor}
                    data={transaction.data}
                />
            ))}
        </div>
    );
}

export default HistoryList;
