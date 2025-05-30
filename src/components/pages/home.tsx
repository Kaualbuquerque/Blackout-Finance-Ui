// src/pages/Home.tsx
import { useEffect, useState } from "react";
import Footer from "../layout/footer";
import Graphic from "../layout/graphic";
import Navbar from "../layout/navbar";
import styles from "../styles/page_styles/home.module.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController,
} from "chart.js";
import HistoryList from "../layout/historyList";
import {
    Transaction,
    deleteExpense,
    deleteIncome,
    fetchEntradas,
    fetchSaidas,
} from "../../services/api";
import AddTransaction from "../layout/addTransaction";
import TotalFinances from "../layout/totalFinances";

// Contexto de tema
import { useTheme } from "../../context/ThemeContext";

function Home() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        BarController
    );

    // ✅ Pega o tema global
    const { isDark } = useTheme();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalExpense, setTotalExpense] = useState<number>(0);

    useEffect(() => {
        const init = async () => {
            const stored = localStorage.getItem("user");
            if (stored) {
                try {
                    const user = JSON.parse(stored) as { email: string };
                    setUserEmail(user.email);
                } catch {
                    setUserEmail(null);
                }
            }

            const entradas = await fetchEntradas().catch((err) => {
                console.warn("Erro ao buscar entradas.", err);
                return [] as Transaction[];
            });
            const saidas = await fetchSaidas().catch((err) => {
                console.warn("Erro ao buscar saídas.", err);
                return [] as Transaction[];
            });

            setTransactions([...entradas, ...saidas]);

            const totalEntradas = entradas.reduce(
                (acc, curr) => acc + parseFloat(curr.valor),
                0
            );
            const totalSaidas = saidas.reduce(
                (acc, curr) => acc + parseFloat(curr.valor),
                0
            );

            setTotalIncome(totalEntradas);
            setTotalExpense(totalSaidas);
        };

        init();
    }, []);

    const handleAddTransaction = (transaction: Transaction) => {
        setTransactions((prev) => [...prev, transaction]);
    };

    const handleDelete = async (id: number, tipo: "Entrada" | "Saída") => {
        try {
            if (tipo === "Entrada") await deleteIncome(id);
            else await deleteExpense(id);
            setTransactions((prev) => prev.filter((t) => t.id !== id));
            setErrorMessage(null);
        } catch (error: any) {
            console.error("Erro ao deletar transação:", error);
            setErrorMessage(error.message || "Erro ao deletar transação.");
        }
    };

    const buildDataByHour = () => {
        const entries = new Array(24).fill(0);
        const exits = new Array(24).fill(0);
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        transactions.forEach((t) => {
            const tDate = new Date(t.data);
            const transactionDate = new Date(tDate);
            transactionDate.setUTCHours(0, 0, 0, 0);
            if (transactionDate.getTime() === today.getTime()) {
                const hour = tDate.getUTCHours();
                const value = parseFloat(t.valor);
                if (t.tipo === "Entrada") entries[hour] += value;
                if (t.tipo === "Saída") exits[hour] += value;
            }
        });

        return {
            labels: [...Array(24).keys()].map((h) =>
                h.toString().padStart(2, "0") + "h"
            ),
            datasets: [
                { label: "Entradas", data: entries, backgroundColor: "rgba(69, 235, 254, 1)" },
                { label: "Saídas", data: exits, backgroundColor: "rgba(241, 104, 91, 1)" },
            ],
        };
    };

    const buildDataByDay = () => {
        const entries = new Array(31).fill(0);
        const exits = new Array(31).fill(0);

        transactions.forEach((t) => {
            const date = new Date(t.data);
            const day = date.getDate() - 1;
            const value = parseFloat(t.valor);
            if (t.tipo === "Entrada") entries[day] += value;
            if (t.tipo === "Saída") exits[day] += value;
        });

        return {
            labels: Array.from({ length: 31 }, (_, i) => `${i + 1}`),
            datasets: [
                { label: "Entradas", data: entries, backgroundColor: "rgba(69, 235, 254, 1)" },
                { label: "Saídas", data: exits, backgroundColor: "rgba(241, 104, 91, 1)" },
            ],
        };
    };

    const buildDataByMonth = () => {
        const entries = new Array(12).fill(0);
        const exits = new Array(12).fill(0);

        transactions.forEach((t) => {
            const month = new Date(t.data).getMonth();
            const value = parseFloat(t.valor);
            if (t.tipo === "Entrada") entries[month] += value;
            if (t.tipo === "Saída") exits[month] += value;
        });

        return {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                { label: "Entradas", data: entries, backgroundColor: "rgba(69, 235, 254, 1)" },
                { label: "Saídas", data: exits, backgroundColor: "rgba(241, 104, 91, 1)" },
            ],
        };
    };

    return (
        <div className={`${styles.container} ${isDark ? styles.dark_theme : styles.light_theme}`}>
            <header>
                <Navbar userEmail={userEmail} />
            </header>
            <main className={styles.home_main}>
                <div className={styles.grid}>
                    <div className={styles.graphics}>
                        <Graphic data={buildDataByHour()} title="Relatório Diário" />
                        <Graphic data={buildDataByDay()} title="Relatório Mensal" />
                        <Graphic data={buildDataByMonth()} title="Relatório Anual" />
                    </div>
                    <div className={styles.transation}>
                        <div className={styles.totalFinances}>
                            <TotalFinances type="expense" value={totalExpense} />
                            <TotalFinances type="income" value={totalIncome} />
                        </div>
                        <AddTransaction
                            onAddTransaction={handleAddTransaction}
                            errorMessage={errorMessage}
                            onErrorClear={() => setErrorMessage(null)}
                        />
                        <div className={styles.historyList}>
                            <HistoryList transactions={transactions} onDelete={handleDelete} />
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Home;
