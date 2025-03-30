import { useState } from "react";
import styles from "../styles/component_styles/addTrasaction.module.css";

interface Transaction {
    tipo: string;      // "Entrada" ou "Saída"
    valor: string;     // Valor da transação
    descricao: string; // Descrição da transação
    data: string;      // Data da transação
    categoria: string; // Categoria da transação
}
interface AddTransactionProps {
    onAddTransaction: (transaction: Transaction) => void;
}

function AddTrasaction({ onAddTransaction }: AddTransactionProps) {

    const [isActive, setIsActive] = useState(false);
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");
    const [categoria, setCategoria] = useState("");

    const togglePosition = () => {
        setIsActive(!isActive);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newTransaction: Transaction = {
            tipo: isActive ? "entrada" : "saida",
            valor,
            descricao,
            data,
            categoria
        };

        onAddTransaction(newTransaction);

        // Limpa os campos após o envio
        setValor("");
        setDescricao("");
        setData("");
        setCategoria("");
    };

    return (
        <div className={styles.transaction_container}>
            <div className={styles.transaction_container_title}><h3>Adicionar Transação</h3></div>
            <div>
                <form className={styles.transaction_container_form} onSubmit={handleSubmit}>

                    <div className={styles.type}>
                        <div>
                            <p>Entrada</p>
                            <div
                                className={`${styles.type_slider} ${isActive ? styles.entrada : styles.saida}`}
                                onClick={togglePosition}
                            ></div>
                            <p>Saída</p>
                        </div>

                        {
                            isActive ?
                                <p>Adicione o valor que recebeu</p>
                                :
                                <p>Adicione o valor que retirou</p>
                        }
                    </div>

                    <div>
                        <label htmlFor="valor">Valor</label>
                        <input
                            type="number"
                            name="valor"
                            id="valor"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            placeholder="Valor da transação"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="descrição">Descrição</label>
                        <input
                            type="text"
                            name="descrição"
                            id="descrição"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descrição da transação"
                        />
                    </div>
                    <div>
                        <label htmlFor="data">Data</label>
                        <input
                            type="text"
                            name="data"
                            id="data"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            placeholder="Data da transação"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.value === "" ? (e.target.type = "text") : null)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="categoria">Categoria</label>
                        <input
                            type="text"
                            name="categoria"
                            id="categoria"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            placeholder="Categoria da transação"
                            required
                        />
                    </div>

                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </div>
    )
}

export default AddTrasaction;
