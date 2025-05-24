// src/layout/navbar.tsx

import styles from "../styles/component_styles/navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

import sun from "../../assets/icons/theme_icon/sun.png";
import moon from "../../assets/icons/theme_icon/moon.png";

interface NavbarProps {
    isDark?: boolean;
    setIsDark?: React.Dispatch<React.SetStateAction<boolean>>;
    userEmail?: string | null;    // nova prop
}

export default function Navbar({
    isDark = false,
    setIsDark,
    userEmail = null,
}: NavbarProps) {
    const navigate = useNavigate();

    const handleThemeToggle = () => {
        setIsDark && setIsDark((prev) => !prev);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link to="/" className={styles.link}>
                    <h2>BLACKOUT FINANCE</h2>
                </Link>

                <div className={styles.profile}>


                    <div className={styles.welcome}>
                        {userEmail ? (
                            <div>
                                <p>Bem-vindo,
                                </p>
                                {userEmail}
                            </div>
                        ) : (
                            <Link
                                to={"/login"}
                                className={styles.link}
                                onClick={() => navigate("/login")}
                            >
                                Iniciar Sessão
                            </Link>
                        )}
                    </div>
                    <div className={styles.iconWrapper} onClick={handleThemeToggle}>
                        <img
                            src={sun}
                            alt="Sun Icon"
                            className={`${styles.icon} ${!isDark ? styles.active : ""}`}
                        />
                        <img
                            src={moon}
                            alt="Moon Icon"
                            className={`${styles.icon} ${isDark ? styles.active : ""}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
