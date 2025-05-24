import styles from "../styles/component_styles/graphic.module.css"

import { ChartData } from "chart.js";
import { Chart } from "react-chartjs-2";

interface graphicProps {
    data: ChartData
    title: string
}

function Graphic({ data, title }: graphicProps) {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: title,  // Título do gráfico
            },
        },
    };

    return (
        <div className={styles.graphic}>
            <Chart type="bar" data={data} options={options}></Chart>
        </div>
    )
}

export default Graphic