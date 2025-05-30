// src/pages/Blackout.tsx
import { useEffect, useState } from "react";
import styles from "../styles/page_styles/blackout.module.css";

import Navbar from "../layout/navbar";
import money_icon from "../../assets/icons/others/money_icon.png";
import Card from "../layout/card";
import Footer from "../layout/footer";
import { Link } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

export default function Blackout() {
    // 🌓 vem do contexto global
    const { isDark } = useTheme();

    // banner state (igual antes)
    const [isScrolled, setIsScrolled] = useState(false);
    const [showBanner, setShowBanner] = useState<boolean>(() => {
        return sessionStorage.getItem("bannerShown") !== "true";
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 350 && showBanner) {
                setIsScrolled(true);
                setTimeout(() => {
                    setShowBanner(false);
                    sessionStorage.setItem("bannerShown", "true");
                }, 500);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [showBanner]);

    return (
        <div className={isDark ? styles.dark_theme : styles.light_theme}>
            {showBanner && (
                <div className={`${styles.banner} ${isScrolled ? styles.hide : ""}`}>
                    <div>
                        <div>
                            <img className={styles.icon} src={money_icon} alt="icon 1" />
                            <img className={styles.icon} src={money_icon} alt="icon 2" />
                            <img className={styles.icon} src={money_icon} alt="icon 3" />
                        </div>
                        <h1>BLACKOUT FINANCE</h1>
                    </div>
                </div>
            )}

            <div className={styles.content}>
                <header>
                    <Navbar />
                </header>

                <main>
                    <section className={styles.details}>
                        <div>
                            <h3>Blackout Finance</h3>
                            <p>
                                A solução perfeita para quem deseja ter um controle financeiro
                                eficiente e simplificado.
                            </p>
                        </div>
                    </section>

                    <section className={styles.details}>
                        <h3>Organize e Controle seu Dinheiro</h3>
                        <p>
                            Com ele, você pode registrar suas entradas e saídas de dinheiro
                            de forma prática, acompanhando seus gastos e ganhos por dia, mês
                            e ano. Visualize suas finanças através de gráficos intuitivos e
                            tome decisões mais conscientes para o seu futuro financeiro.
                        </p>
                        <div>
                            <Card
                                title="Controle"
                                description="Tenha um controle melhor do fluxo do seu dinhero"
                                style={isDark ? "dark_theme" : "light_theme"}
                            />
                            <Card
                                title="Analise"
                                description="Tenha acesso a graficos do seu fluxo de dinheiro"
                                style={isDark ? "dark_theme" : "light_theme"}
                            />
                            <Card
                                title="Monitorar"
                                description="Tenha um melhor monitoramento do seu dinheiro"
                                style={isDark ? "dark_theme" : "light_theme"}
                            />
                        </div>
                    </section>

                    <section className={styles.details}>
                        <div>
                            <h3>COMECE AGORA A USAR!</h3>
                            <p>Criar uma conta é rápido e fácil</p>
                        </div>
                        <div>
                            <Link to={"/login"}>
                                <button>Cadastrar</button>
                            </Link>
                        </div>
                    </section>
                </main>

                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}
