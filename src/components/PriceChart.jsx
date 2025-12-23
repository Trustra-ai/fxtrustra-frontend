import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function PriceChart({ title, data, color = '#00ff9d' }) {
  if (!data || data.length === 0) return <p>Loading chart...</p>

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      label: title,
      data: data.map(d => d.price),
      borderColor: color,
      backgroundColor: color + '33',
      tension: 0.4,
      pointRadius: 2,
    }]
  }

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: true, text: title, color: '#e0e0e0' } },
    scales: { x: { ticks: { color: '#a0a0a0' } }, y: { ticks: { color: '#a0a0a0' } } }
  }

  return <Line options={options} data={chartData} />
}
