import { useState, useEffect } from "react";
import styles from "../styles/component_styles/addTrasaction.module.css";
import { createIncome, createExpense, TransactionInput, Transaction } from "../../services/api";
import ErrorMessage from "./ErrorMessage";

interface AddTransactionProps {
    onAddTransaction: (transaction: Transaction) => void;
    errorMessage?: string | null;
    onErrorClear?: () => void;
}

function AddTransaction({ onAddTransaction, errorMessage, onErrorClear }: AddTransactionProps) {
    const [isActive, setIsActive] = useState(true);
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [categoria, setCategoria] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Se receber uma mensagem de erro do pai, reseta o error interno
        if (errorMessage) {
            setError("");
        }
    }, [errorMessage]);

    const togglePosition = () => {
        setIsActive(!isActive);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        onErrorClear?.();
        setLoading(true);

        try {
            if (!data || !hora) {
                setError("Preencha a data e a hora.");
                return;
            }

            const dataHora = `${data}T${hora}`;

            const payload: TransactionInput = {
                value: parseFloat(valor),
                category: categoria,
                description: descricao,
                data: dataHora,
            };

            const created: Transaction = isActive
                ? await createIncome(payload)
                : await createExpense(payload);

            onAddTransaction(created);

            // Limpa campos
            setValor("");
            setDescricao("");
            setData("");
            setHora("");
            setCategoria("");
        } catch (err: any) {
            console.error("Erro ao criar transação:", err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Não foi possível adicionar a transação. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.transaction_container}>
            <div className={styles.transaction_container_title}>
                <h3>Adicionar Transação</h3>
            </div>

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
                    <p>{isActive ? "Adicione o valor que recebeu" : "Adicione o valor que retirou"}</p>
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
                    <label htmlFor="descricao">Descrição</label>
                    <input
                        type="text"
                        name="descricao"
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição da transação"
                    />
                </div>

                <div>
                    <label htmlFor="data">Data</label>
                    <input
                        type="date"
                        name="data"
                        id="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="hora">Hora</label>
                    <input
                        type="time"
                        name="hora"
                        id="hora"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
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

                <button type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Adicionar"}
                </button>
            </form>

            <div className={styles.error}>
                <ErrorMessage message={error} onClear={() => setError("")} />
                {errorMessage && <ErrorMessage message={errorMessage} onClear={onErrorClear!} />}
            </div>
        </div>
    );
}

export default AddTransaction;