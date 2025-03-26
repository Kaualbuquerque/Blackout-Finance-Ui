import styles from "../styles/component_styles/navbar.module.css"
import { Link } from "react-router-dom";

import sun from "../../assets/icons/theme_icon/sun.png"
import moon from "../../assets/icons/theme_icon/moon.png"

interface NavbarProps {
    isDark?: boolean;
    setIsDark?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ isDark = false, setIsDark }: NavbarProps) {

    const handleThemeToggle = () => {
        if (setIsDark) {
            setIsDark(prevState => !prevState);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link to="/" className={styles.link}><h2>BLACKOUT FINANCE</h2></Link>

                <div className={styles.profile}>
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
                    <Link to="/login" className={styles.link}><span>Login</span></Link>
                    <p>|</p>
                    <Link to="/cadastro" className={styles.link}><span>Cadastro</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
