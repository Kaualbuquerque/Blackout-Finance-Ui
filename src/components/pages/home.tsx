import { useState } from "react";
import Footer from "../layout/footer"
import Graphic from "../layout/graphic";
import Navbar from "../layout/navbar"
import styles from "../styles/page_styles/home.module.css"

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import AddTrasaction from "../layout/addTransaction";
import HistoryList from "../layout/historyList";

function Home() {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const [isDark, setIsDark] = useState<boolean>(false);

    // Dados para o gráfico diário (separado por horas do dia)
    const dataDay = {
        labels: ["00h", "01h", "02h", "03h", "04h", "05h", "06h", "07h", "08h", "09h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h", "23h"],
        datasets: [
            {
                label: "Entradas",
                data: [10, 20, 15, 25, 30, 40, 35, 60, 55, 70, 80, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220],
                backgroundColor: "rgba(69, 235, 254, 1)",
            },
            {
                label: "Saídas",
                data: [5, 15, 10, 20, 25, 30, 40, 45, 50, 60, 70, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140],
                backgroundColor: "rgba(241, 104, 91, 1)",
            },
        ],
    };

    // Dados para o gráfico mensal (separado por dias do mês)
    const dataMonth = {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`), // Criando os dias do mês (de 1 a 30)
        datasets: [
            {
                label: "Entradas",
                data: [100, 120, 130, 140, 150, 170, 160, 180, 190, 200, 210, 220, 240, 250, 270, 280, 290, 300, 310, 330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 430],
                backgroundColor: "rgba(69, 235, 254, 1)",
            },
            {
                label: "Saídas",
                data: [90, 110, 120, 130, 140, 160, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380],
                backgroundColor: "rgba(241, 104, 91, 1)",
            },
        ],
    };

    // Dados para o gráfico anual (separado por meses)
    const dataYear = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Entradas",
                data: [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300],
                backgroundColor: "rgba(69, 235, 254, 1)",
            },
            {
                label: "Saídas",
                data: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100],
                backgroundColor: "rgba(241, 104, 91, 1)",
            },
        ],
    };

    const transactions = [
        { categoria: "Academia", descricao: "Mensalidade da academia", tipo: "entrada", valor: 70, data: "20/12/25" },
        { categoria: "Alimentação", descricao: "Compra no supermercado", tipo: "saida", valor: 150, data: "22/12/25" },
        { categoria: "Salário", descricao: "Recebimento de pagamento", tipo: "entrada", valor: 2500, data: "30/12/25" }
    ];

    return (
        <div className={`${styles.container}  ${isDark ? styles.dark_theme : styles.light_theme}`}>
            <header>
                <Navbar isDark={isDark} setIsDark={setIsDark} />
            </header>
            <main className={styles.home_main}>
                <div className={styles.grid}>
                    <div className={styles.graphics}>
                        <Graphic data={dataDay} title="Relatório Diário" />
                        <Graphic data={dataMonth} title="Relatório Mensal" />
                        <Graphic data={dataYear} title="Relatório Anual" />
                    </div>
                    <div className={styles.transation}>
                        <AddTrasaction />
                        <HistoryList transactions={transactions} />
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Home