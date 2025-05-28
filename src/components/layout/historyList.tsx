import { Transaction } from "../../services/api";
import styles from "../styles/component_styles/historyList.module.css";
import EntryHistory from "./entryHistory";

interface HistoryListProps {
    transactions: Transaction[];
    onDelete: (id: number, tipo: Transaction["tipo"]) => void;
}

function HistoryList({ transactions, onDelete }: HistoryListProps) {
    return (
        <div className={styles.history}>
            {transactions.map((transaction) => (
                <EntryHistory transaction={transaction} onDelete={onDelete} key={transaction.id}/>
            ))}
        </div>
    );
}

export default HistoryList;
