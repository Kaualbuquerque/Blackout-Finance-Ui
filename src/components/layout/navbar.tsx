import styles from "../styles/navbar.module.css"

function Navbar() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>BLACKOUT FINANCE</h2>

                <div className={styles.profile}>
                    <a href=""><span>Login</span></a>
                    <p>|</p>
                    <a href=""><span>Cadastro</span></a>
                </div>
            </div>
        </div>
    )
}

export default Navbar