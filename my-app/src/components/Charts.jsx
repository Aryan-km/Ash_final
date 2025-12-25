import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const purpleTheme = {
  primary: '#7c3aed',
  secondary: '#a78bfa',
  light: '#ede9fe',
  dark: '#6d28d9',
  darker: '#5b21b6'
};

export const BarChart = ({ data, title, labels }) => {
  const chartData = {
    labels: labels || data.map(item => item.label),
    datasets: [
      {
        label: title || 'Data',
        data: data.map(item => item.value),
        backgroundColor: purpleTheme.primary,
        borderColor: purpleTheme.dark,
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: !!title,
        text: title,
        color: '#1f2937',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e7eb',
        },
        ticks: {
          color: '#6b7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export const PieChart = ({ data, title }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          purpleTheme.primary,
          purpleTheme.secondary,
          purpleTheme.light,
          purpleTheme.dark,
          '#c4b5fd',
          '#ddd6fe',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#6b7280',
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: !!title,
        text: title,
        color: '#1f2937',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          bottom: 20,
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export const LineChart = ({ data, title, labels }) => {
  const chartData = {
    labels: labels || data.map(item => item.label),
    datasets: [
      {
        label: title || 'Data',
        data: data.map(item => item.value),
        borderColor: purpleTheme.primary,
        backgroundColor: purpleTheme.light,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: purpleTheme.primary,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: !!title,
        text: title,
        color: '#1f2937',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e7eb',
        },
        ticks: {
          color: '#6b7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

