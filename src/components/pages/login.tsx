import styles from "../styles/page_styles/login.module.css"

import Navbar from "../layout/navbar"
import { useEffect, useState } from "react"

import login_img from "../../assets/images/fluid_banner_login_img.png"
import cadastro_img from "../../assets/images/fluid_banner_cadastro_img.png"

function Login() {

    const [isActivated, setIsActivated] = useState(false)
    const [position, setposition] = useState("direita")
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = ''; 
        };
    }, []);

    return (
        <div >
            <Navbar isDark={isDark} setIsDark={setIsDark} />

            <main className={`${styles.login_main} ${isDark ? styles.dark_theme : styles.light_theme}`}>
                <div className={styles.form_div}>
                    <div>
                        <form action="">
                            <h2>Criar Conta</h2>
                            <div>
                                <label htmlFor="name">Nome</label>
                                <input type="text" name="nome" id="nome" placeholder="Digite seu nome" />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" placeholder="Digite seu email" />
                            </div>
                            <div>
                                <label htmlFor="data_nascimento">Data de Nascimento</label>
                                <input type="date" name="data_nascimento" id="data_nascimento" placeholder="Digite sua data de nascimento" />
                            </div>
                            <div>
                                <label htmlFor="telefone">Telefone</label>
                                <input type="text" name="telefone" id="telefone" placeholder="Digite seu telefone" />
                            </div>
                            <div>
                                <label htmlFor="senha">Senha</label>
                                <input type="password" name="senha" id="senha" placeholder="Digite sua senha" />
                            </div>
                            <div>
                                <label htmlFor="senha">Confirme sua Senha</label>
                                <input type="password" name="senha" id="senha" placeholder="Confirme sua senha" />
                            </div>
                            <button>Criar Conta</button>
                        </form>
                    </div>
                    <div className={`${styles.fluid_banner} ${styles[position]}`}>
                        {
                            isActivated ?
                                (
                                    <div>
                                        <div>
                                            <h3>Iniciar Sessão</h3>
                                            <p>Clique aqui para acessar sua conta existente!</p>
                                            <button onClick={() => (setposition("direita"), setIsActivated(!isActivated))}>Login</button>
                                        </div>
                                        <div>
                                            <img src={login_img} alt="" />
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        <div>
                                            <h3>Criar Conta</h3>
                                            <p>Clique aqui para criar uma nova conta!</p>
                                            <button onClick={() => (setposition("esquerda"), setIsActivated(!isActivated))}>Cadastrar</button>
                                        </div>
                                        <div>
                                            <img src={cadastro_img} alt="" />
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                    <div>
                        <form action="">
                            <h2>Acessar Conta</h2>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" placeholder="Digite seu email" />
                            </div>
                            <div>
                                <label htmlFor="senha">Senha</label>
                                <input type="password" name="senha" id="senha" placeholder="Digite sua senha" />
                            </div>
                            <button>Acessar Conta</button>
                        </form>
                    </div>
                </div>
            </main >
        </div >
    )
}


export default Login