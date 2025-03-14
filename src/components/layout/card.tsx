import styles from "../styles/card.module.css"

interface CardProps{
    title: String,
    description: String
}

function Card({ title, description }: CardProps){
    return(
        <div className={styles.card}>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    )
}

export default Card