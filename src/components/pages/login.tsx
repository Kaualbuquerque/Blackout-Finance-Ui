import styles from "../styles/page_styles/login.module.css"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import login_img from "../../assets/images/fluid_banner_login_img.png"
import cadastro_img from "../../assets/images/fluid_banner_cadastro_img.png"
import arrow from "../../assets/icons/others/arrow.png"

function Login() {

    const navigate = useNavigate(); // Criando o navegador de redirecionamento
    const [isActivated, setIsActivated] = useState(false)
    const [position, setposition] = useState("direita")

    // Estados para armazenar os valores dos inputs
    const [formData, setFormData] = useState({
        nome: "",
        cadastro_email: "",
        data_nascimento: "",
        telefone: "",
        cadastro_senha: "",
        senha_confirm: ""
    })

    const [loginData, setLoginData] = useState({
        login_email: "",
        login_senha: ""
    })

    // Manipula as mudanças nos inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Submissão do formulário de cadastro
    const handleSubmitCadastro = (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.cadastro_senha !== formData.senha_confirm) {
            alert("As senhas não coincidem!")
            return
        }

        // Aqui você pode fazer uma requisição ao backend
        console.log("Cadastro enviado:", formData)
        setposition("direita");
        setIsActivated(!isActivated)
        alert("Cadastro realizado com sucesso!")
    }

    // Submissão do formulário de login
    const handleSubmitLogin = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Login enviado:", loginData)
        // Aqui você pode fazer uma requisição ao backend
        navigate("/home");
    }

    const toBlackout = () => {
        navigate("/")
    }

    return (
        <div className={styles.login_container}>
            <div><img src={arrow} alt="arrow icon" onClick={toBlackout}/></div>
            <main className={`${styles.login_main}`}>
                <div className={styles.form_div}>
                    <div>
                        <form onSubmit={handleSubmitCadastro}>
                            <h2>Criar Conta</h2>
                            <div>
                                <label htmlFor="nome">Nome</label>
                                <input type="text" name="nome" id="nome" placeholder="Digite seu nome"
                                    value={formData.nome} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="cadastro_email">Email</label>
                                <input type="email" name="cadastro_email" id="cadastro_email" placeholder="Digite seu email"
                                    value={formData.cadastro_email} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="data_nascimento">Data de Nascimento</label>
                                <input type="date" name="data_nascimento" id="data_nascimento"
                                    value={formData.data_nascimento} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="telefone">Telefone</label>
                                <input type="text" name="telefone" id="telefone" placeholder="Digite seu telefone"
                                    value={formData.telefone} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="cadastro_senha">Senha</label>
                                <input type="password" name="cadastro_senha" id="cadastro_senha" placeholder="Digite sua senha"
                                    value={formData.cadastro_senha} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="senha_confirm">Confirme sua Senha</label>
                                <input type="password" name="senha_confirm" id="senha_confirm" placeholder="Confirme sua senha"
                                    value={formData.senha_confirm} onChange={handleChange} />
                            </div>
                            <button type="submit">Criar Conta</button>
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
                        <form onSubmit={handleSubmitLogin}>
                            <h2>Acessar Conta</h2>
                            <div>
                                <label htmlFor="login_email">Email</label>
                                <input type="email" name="login_email" id="login_email" placeholder="Digite seu email"
                                    value={loginData.login_email} onChange={handleLoginChange} />
                            </div>
                            <div>
                                <label htmlFor="login_senha">Senha</label>
                                <input type="password" name="login_senha" id="login_senha" placeholder="Digite sua senha"
                                    value={loginData.login_senha} onChange={handleLoginChange} />
                            </div>
                            <button type="submit">Acessar Conta</button>
                        </form>
                    </div>
                </div>
            </main >
        </div >
    )
}


export default Login