import styles from "../styles/page_styles/login.module.css"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser, loginUser } from "../../services/api"

import login_img from "../../assets/images/fluid_banner_login_img.png"
import cadastro_img from "../../assets/images/fluid_banner_cadastro_img.png"
import arrow from "../../assets/icons/others/arrow.png"

function Login() {
    const navigate = useNavigate()
    const [isActivated, setIsActivated] = useState(false)
    const [position, setPosition] = useState("direita")
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    // Estados para armazenar os valores dos inputs de cadastro
    const [formData, setFormData] = useState({
        nome: "",
        cadastro_email: "",
        data_nascimento: "",
        telefone: "",
        cadastro_senha: "",
        senha_confirm: "",
    })

    // Estados para inputs de login
    const [loginData, setLoginData] = useState({
        login_email: "",
        login_senha: "",
    })

    // Feedback
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    // Bloqueia scroll ao montar e restaura ao desmontar
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const sanitizedValue =
            name === "telefone"           // campo que deve aceitar só dígitos
                ? value.replace(/\D/g, "")  // remove tudo que não for 0-9
                : value;                    // demais campos, mantém como veio

        setFormData(prev => ({
            ...prev,
            [name]: sanitizedValue,
        }));

        setError("");
        setSuccess("");
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 480);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLoginChange = (e: any) => {
        const { name, value } = e.target
        setLoginData(prev => ({ ...prev, [name]: value }))
        setError("")
    }

    // Cadastro: usa registerUser do api.ts
    const handleSubmitCadastro = async (e: any) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (formData.cadastro_senha !== formData.senha_confirm) {
            setError("As senhas não coincidem!")
            return
        }

        try {
            await registerUser({
                name: formData.nome,
                dateOfBirth: formData.data_nascimento,
                phoneNumber: formData.telefone,
                email: formData.cadastro_email,
                password: formData.cadastro_senha,
            })

            setSuccess("Cadastro realizado com sucesso! Faça login agora.")
            setFormData({ nome: '', cadastro_email: '', data_nascimento: '', telefone: '', cadastro_senha: '', senha_confirm: '' })
            setPosition('direita')
            setIsActivated(false)
        } catch (err) {
            console.error(err)
        }
    }

    // Login: usa loginUser do api.ts
    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            // Agora esperamos receber { token, user }
            const { token, user } = await loginUser({
                email: loginData.login_email,
                password: loginData.login_senha,
            });

            // Armazena o token e o usuário (serializado) no localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/home");
        } catch (err: any) {
            const errorMsg =
                err?.response?.data?.message ||
                "Email ou senha incorretos. Tente novamente.";
            setError(errorMsg);
            console.error("Erro ao fazer login:", err);
        }
    };

    const toBlackout = () => navigate('/')

    return (
        <div className={styles.login_container}>
            <div>
                <img src={arrow} alt="Voltar" onClick={toBlackout} />
            </div>

            <main className={styles.login_main}>
                <div className={styles.form_div}>


                    {/* Banner animado */}
                    <div className={`${styles.fluid_banner} ${styles[position]}`}>
                        {isActivated ? (
                            <div>
                                <div>
                                    <h3>Novidade!</h3>
                                    <p>Crie uma conta e comece a usar.</p>
                                    <button type="button" onClick={() => { setPosition('direita'); setIsActivated(false); }}>
                                        Cadastrar
                                    </button>
                                </div>
                                <img src={cadastro_img} alt="Banner de Cadastro" />
                            </div>
                        ) : (
                            <div>
                                <div>
                                    <h3>Iniciar Sessão</h3>
                                    <p>Clique aqui para acessar sua conta existente!</p>
                                    <button type="button" onClick={() => { setPosition('esquerda'); setIsActivated(true); }}>
                                        Login
                                    </button>
                                </div>
                                <img src={login_img} alt="Banner de Login" />
                            </div>
                        )}
                    </div>

                    {/* Formulário de login */}
                    <form onSubmit={handleSubmitLogin} className={styles.formBox}>
                        <h2>Acessar Conta</h2>
                        {error && <p className={styles.error}>{error}</p>}

                        <input type="email" name="login_email" placeholder="Email" value={loginData.login_email} onChange={handleLoginChange} required />
                        <input type="password" name="login_senha" placeholder="Senha" value={loginData.login_senha} onChange={handleLoginChange} required />
                        <button type="submit">Acessar Conta</button>
                    </form>

                    {/* Novo Banner Fluido para telas menores */}
                    {isSmallScreen && (
                        <div className={`${styles.fluid_banner} ${isActivated ? styles.direita : styles.esquerda}`}>
                            {isActivated ? (
                                <div>
                                    <div>
                                        <h3>Iniciar Sessão</h3>
                                        <p>Clique aqui para acessar sua conta existente!</p>
                                        <button onClick={() => (setPosition('direita'), setIsActivated(false))}>Login</button>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    )}

                    {/* Novo Banner Fluido para telas menores */}
                    {isSmallScreen && (
                        <div className={`${styles.fluid_banner} ${!isActivated ? styles.direita : styles.esquerda}`}>
                            {isActivated ? (
                                <></>
                            ) : (
                                <div>
                                    <div>
                                        <h3>Novidade!</h3>
                                        <p>Crie uma conta e comece a usar.</p>
                                        <button type="button" onClick={() => { setPosition('esquerda'); setIsActivated(true); }}>
                                            Cadastrar
                                        </button>
                                    </div>
                                    <img src={cadastro_img} alt="Banner de Cadastro" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Formulário de cadastro */}
                    <form onSubmit={handleSubmitCadastro} className={styles.formBox}>
                        <h2>Criar Conta</h2>
                        {error && <p className={styles.error}>{error}</p>}
                        {success && <p className={styles.success}>{success}</p>}

                        <input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
                        <input type="date" name="data_nascimento" placeholder="Data de Nascimento" value={formData.data_nascimento} onChange={handleChange} required />
                        <input type="tel" inputMode="numeric" pattern="\d*" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} maxLength={11} required />
                        <input type="email" name="cadastro_email" placeholder="Email" value={formData.cadastro_email} onChange={handleChange} required />
                        <input type="password" name="cadastro_senha" placeholder="Senha" value={formData.cadastro_senha} onChange={handleChange} required />
                        <input type="password" name="senha_confirm" placeholder="Confirme sua Senha" value={formData.senha_confirm} onChange={handleChange} required />
                        <button type="submit">Criar Conta</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Login
