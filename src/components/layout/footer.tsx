import styles from "../styles/component_styles/footer.module.css"

import instagram from "../../assets/icons/social_midia_icon/instagram.png"
import github from "../../assets/icons/social_midia_icon/github.png"
import x from "../../assets/icons/social_midia_icon/X.png"

function Footer() {
    return (
        <div className={styles.footer}>
            <div>
                <div>
                    <h3>Social</h3>
                    <ul>
                        <li><img src={instagram}  /></li>
                        <li><img src={github}  /></li>
                        <li><img src={x}  /></li>
                    </ul>
                </div>
                <div>
                    <h3>Contato</h3>
                    <ul>
                        <li><p>Blackout@gmail.com</p></li>
                        <li><p>(xx) xxxxx-xxxx</p></li>
                    </ul>
                </div>
                <div>
                    <h3>Ajuda</h3>
                    <ul>
                        <li><p>FAQ</p></li>
                        <li><p>SAC</p></li>
                    </ul>
                </div>
                <div>
                    <h3>Jurídico</h3>
                    <ul>
                        <li><p>Termos de Serviços</p></li>
                        <li><p>política de Privacidade</p></li>
                    </ul>
                </div>
            </div>
            <hr />
            <div>
                <p>Copyright © 2025 Blackout Finances</p>
            </div>
        </div>
    )
}

export default Footer