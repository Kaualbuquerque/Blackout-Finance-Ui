
import { useEffect, useState } from "react";
import styles from "../styles/page_styles/blackout.module.css"

import Navbar from "../layout/navbar";

import money_icon from "../../assets/icons/others/money_icon.png"
import Card from "../layout/card";
import Footer from "../layout/footer";

function Blackout() {

    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 350) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={isDark ? styles.dark_theme : styles.light_theme}>

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
                    <Navbar isDark={isDark} setIsDark={setIsDark} />
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
                            <Card title="Controle" description="Tenha um controle melhor do fluxo do seu dinhero" style={isDark ? "dark_theme" : "light_theme"} />
                            <Card title="Analise" description="Tenha acesso a graficos do seu fluxo de dinheiro" style={isDark ? "dark_theme" : "light_theme"} />
                            <Card title="Monitorar" description="Tenha um melhor monitoramento do seu dinheiro" style={isDark ? "dark_theme" : "light_theme"} />
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