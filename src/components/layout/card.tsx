import styles from "../styles/component_styles/card.module.css"

interface CardProps {
    title: String,
    description: String
    style: string
}

function Card({ title, description, style }: CardProps) {
    return (
        <div className={`${styles.card} ${styles[style]}`}>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    )
}

export default Card