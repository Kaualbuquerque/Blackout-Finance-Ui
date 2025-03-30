import styles from "../styles/component_styles/addTrasaction.module.css"

function AddTrasaction() {
    return (
        <div className={styles.transaction_container}>
            <div className={styles.transaction_container_title}><h3>Adcionar Transação</h3></div>
            <div>
                <form className={styles.transaction_container_form}>
                    <div>
                        <label htmlFor="valor">Valor</label>
                        <input type="number" name="valor" id="valor" placeholder="Valor da tranasação" />
                    </div>
                    <div>
                        <label htmlFor="descrição">Descrição</label>
                        <input type="text" name="descrição" id="descrição" placeholder="Descrição da transação" />
                    </div>
                    <div>
                        <label htmlFor="data">Data</label>
                        <input
                            type="text"
                            name="data"
                            id="data"
                            placeholder="Data da transação"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.value === "" ? (e.target.type = "text") : null)}
                        />
                    </div>
                    <div>
                        <label htmlFor="categoria">Categoria</label>
                        <input type="text" name="categoria" id="categoria" placeholder="Categoria da transação" />
                    </div>
                    <div>
                        <label htmlFor="form_transacao">Forma de Transação</label>
                        <select name="form_transacao" id="form_transacao" >
                        <option value="" disabled selected>Forma de transação</option>
                            <option value="dinheiro">Dinheiro</option>
                            <option value="cartão">Cartão</option>
                            <option value="pix">Pix</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="tipo">Tipo de Transação</label>
                        <select name="tipo" id="tipo">
                        <option value="" disabled selected>Tipo de transação</option>
                            <option value="entrada">Entrada</option>
                            <option value="saída">Saída</option>
                        </select>
                    </div>

                    <button type="submit">Adicionar</button>
                </form>

            </div>
        </div>
    )
}

export default AddTrasaction