
import { useEffect, useState } from "react";
import styles from "../styles/blackout.module.css"

import Navbar from "../layout/navbar";

import money_icon from "../../assets/icons/money_icon.png"
import Card from "../layout/card";
import Footer from "../layout/footer";

function Blackout() {

    const [isScrolled, setIsScrolled] = useState(false);

    // Função para controlar o comportamento do scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 350) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Adiciona o evento de scroll
        window.addEventListener('scroll', handleScroll);

        // Remove o evento de scroll ao desmontar o componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.container}>

            <div className={`${styles.banner} ${isScrolled ? styles.hide : ''}`}>
                <div>
                    <img className={styles.icon} src={money_icon} alt="icon 1" />
                    <img className={styles.icon} src={money_icon} alt="icon 2" />
                    <img className={styles.icon} src={money_icon} alt="icon 3" />
                    <h1>BLACKOUT FINANCE</h1>
                </div>
            </div>
            <div className={styles.behind_banner}>
            </div>


            <div className={styles.content}>
                <header>
                    <Navbar />
                </header>

                <main>
                    <section className={styles.details}>
                        <div>
                            <h3>Blackout Finance</h3>
                            <p>A solução perfeita para quem deseja ter um controle financeiro eficiente e simplificado.</p>
                        </div>
                    </section>

                    <section className={styles.details}>
                        <h3>Organize e Controle seu Dinheiro</h3>
                        <p>Com ele, você pode registrar suas entradas e saídas de dinheiro de forma prática, acompanhando seus gastos e ganhos por dia, mês e ano. Visualize suas finanças através de gráficos intuitivos e tome decisões mais conscientes para o seu futuro financeiro. Gerencie seu dinheiro com clareza e sem complicações!</p>

                        <div>
                            <Card title="Controle" description="Tenha um controle melhor do fluxo do seu dinhero" />
                            <Card title="Analise" description="Tenha acesso a graficos do seu fluxo de dinheiro" />
                            <Card title="Monitorar" description="Tenha um melhor monitoramento do seu dinheiro" />
                        </div>
                    </section>

                    <section className={styles.details}>
                        <div>
                            <h3>COMECE AGORA A USAR!</h3>
                            <p>Criar uma conta é rápido e fácil</p>
                        </div>
                        <div>
                            <button>Cadastrar</button>
                        </div>
                    </section>
                </main>

                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
    )
}

export default Blackout